import React, { useState } from "react";
import { motion } from "framer-motion";
import { categoriesOptions } from "../../utils/data";
import { FaCloudUploadAlt, MdDelete } from "../../assets/icons";
import {
  deleteObject,
  getDownloadURL,
  ref,
  uploadBytesResumable,
} from "firebase/storage";
import { storage } from "../../config/firebaseConfig";
import { useDispatch, useSelector } from "react-redux";
import { btnClick } from "../../animations";
import { addNewProduct, getAllProducts } from "../../api";
import { setAllProducts } from "../../app/slices/productSlice";
import { IoCloudUploadOutline, IoTrashBin } from "react-icons/io5";
import toast from "react-hot-toast";
import { v4 as uuidv4 } from "uuid";

const DBNewItem = () => {
  const [itemName, setItemName] = useState("");
  const [price, setPrice] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState(null);

  const [imgDownloadURLs, setImgDownloadURLs] = useState([]);
  const [progress, setProgress] = useState([]);
  const [isLoading, setIsLoading] = useState([]);

  // console.log(imgDownloadURLs);
  // console.log(progress);
  // console.log(isLoading);

  const user = useSelector((data) => data.user);
  // console.log(user);
  const dispatch = useDispatch();

  const uploadImgs = (e) => {
    const imgFiles = e.target.files;
    const promises = [];
    setProgress(new Array(imgFiles.length).fill(0));
    setIsLoading(new Array(imgFiles.length).fill(true));
    for (let i = 0; i < imgFiles.length; i++) {
      const imgFile = imgFiles[i];
      const storageRef = ref(storage, `Images/${Date.now()}_${imgFile.name}`);
      const uploadTask = uploadBytesResumable(storageRef, imgFile);
      promises.push(uploadTask);
      uploadTask.on(
        "state_changed",
        (snapshot) => {
          setProgress((prevProgress) => {
            const newProgress = [...prevProgress];
            newProgress[i] =
              (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
            return newProgress;
          });
        },
        (error) => {
          console.log(error);
        },
        () => {
          setIsLoading((prevIsLoading) => {
            const newIsLoading = [...prevIsLoading];
            newIsLoading[i] = false;
            return newIsLoading;
          });
        }
      );
    }

    Promise.all(promises)
      .then((snapshots) => {
        return Promise.all(
          snapshots.map((snapshot) => getDownloadURL(snapshot.ref))
        );
      })
      .then((downloadURLs) => {
        setImgDownloadURLs((prevURLs) => [...prevURLs, ...downloadURLs]);
        setIsLoading([]);
        setProgress([]);
      });
  };

  const deleteImageFromFirebase = (imgURL) => {
    const deleteRef = ref(storage, imgURL);
    deleteObject(deleteRef).then(() => {
      setImgDownloadURLs((prevURLs) =>
        prevURLs.filter((url) => url !== imgURL)
      );
    });
  };

  const submitNewData = () => {
    if (!itemName || !category || !price || !description || !imgDownloadURLs) {
      toast.error("Required fields shouldn't be empty!");
    } else {
      const data = {
        product_id: uuidv4(),
        product_name: itemName,
        product_category: category,
        product_price: price,
        product_description: description,
        imageURLs: imgDownloadURLs,
        added_by: user.name,
        reviews: [],
      };
      // console.log(data);
      addNewProduct(data).then((res) => {
        toast.success("Product added successfully!");
        setImgDownloadURLs(null);
        setItemName("");
        setPrice("");
        setDescription("");
        setCategory(null);
      });
      getAllProducts().then((data) => {
        dispatch(setAllProducts(data));
      });
    }
  };

  return (
    <div className="flex items-center justify-center flex-col pt-6 w-full">
      <div className="border border-gray-300 rounded-md p-4 w-full flex flex-col items-start justify-center gap-4 max-w-3xl">
        <InputField
          type="text"
          placeHolder={"Item Name"}
          stateValue={itemName}
          stateFunction={setItemName}
        />
        <InputField
          type="number"
          placeHolder={"Price"}
          stateValue={price}
          stateFunction={setPrice}
        />
        <InputField
          type="text"
          placeHolder={"Description"}
          stateValue={description}
          stateFunction={setDescription}
        />
        <div className="w-full">
          <select
            onChange={(e) => setCategory(e.target.value)}
            className="outline-none w-full border-0 rounded-md cursor-pointer px-3 py-3 bg-lightOverlay shadow-md border-gray-200 text-gray-400"
          >
            <option value="other" className="text-black">
              Select Category
            </option>
            {categoriesOptions &&
              categoriesOptions.map((item) => (
                <option
                  key={item.id}
                  className="border-0 outline-none capitalize text-black"
                  value={item.value}
                >
                  {item.title}
                </option>
              ))}
          </select>
        </div>
        <div className="flex flex-col gap-2 w-full">
          <div className="w-full grid md:grid-cols-3 grid-cols-1 gap-2">
            <label
              htmlFor="upload-image"
              className="w-full h-36 bg-slate-300 rounded-md border flex flex-col items-center justify-center gap-2 cursor-pointer"
            >
              <IoCloudUploadOutline className="text-3xl" />
              <span>Upload</span>
              <input
                multiple
                id="upload-image"
                type="file"
                name="upload-image"
                accept="image/*"
                onChange={uploadImgs}
                className="w-0 h-0"
              />
            </label>
          </div>

          <div className="w-full grid md:grid-cols-3 grid-cols-1 gap-2">
            {imgDownloadURLs?.length > 0 &&
              imgDownloadURLs.map((url, i) => (
                <ImagePreview
                  key={i}
                  url={url}
                  loading={false}
                  progress={null}
                  deleteImageFromFirebase={deleteImageFromFirebase}
                />
              ))}
            {isLoading.length > 0 &&
              isLoading.map(
                (bool, j) =>
                  bool === true && (
                    <ImagePreview
                      key={j}
                      url={null}
                      loading={bool}
                      progress={progress[j]}
                    />
                  )
              )}
          </div>
        </div>
        <motion.button
          onClick={submitNewData}
          {...btnClick}
          className="w-full py-2 mx-auto rounded-md bg-emerald-400 text-primary hover:bg-emerald-500 transition-all cursor-pointer"
        >
          Save
        </motion.button>
      </div>
    </div>
  );
};

export const InputField = ({
  type,
  placeHolder,
  stateValue,
  stateFunction,
}) => {
  return (
    <>
      <input
        type={type}
        placeholder={placeHolder}
        className="w-full px-4 py-3 bg-lightOverlay shadow-md outline-none rounded-md border border-gray-200 focus:border-yellow-400"
        value={stateValue}
        onChange={(e) => stateFunction(e.target.value)}
      />
    </>
  );
};

export const ImagePreview = ({
  url,
  loading,
  progress,
  deleteImageFromFirebase,
}) => {
  return (
    <div className="w-full h-40 rounded-md overflow-hidden bg-slate-300 relative group flex items-center justify-center">
      {loading ? (
        <>
          <div className="w-12 h-12 rounded-full animate-spin border-4 border-dashed border-green-500 border-t-transparent absolute z-50"></div>
          {progress >= 0 && progress <= 100 && (
            <span className="absolute bottom-1 right-1 text-sm p-2">
              {Math.round(progress)}%
            </span>
          )}
        </>
      ) : (
        <>
          <IoTrashBin
            className="text-xl text-red-500 absolute top-2 cursor-pointer right-0 opacity-0 group-hover:right-2 group-hover:opacity-100 transition-all"
            onClick={() => deleteImageFromFirebase(url)}
          />
          <img src={url} alt="" className="w-full h-full object-contain" />
        </>
      )}
    </div>
  );
};

export default DBNewItem;
