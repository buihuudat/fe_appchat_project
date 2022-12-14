import axios from "axios";

const path = "https://api.cloudinary.com/v1_1/ddtagvynp/upload";

const imageUpload = async (img) => {
  const data = new FormData();
  data.append("file", img);
  data.append("upload_preset", "appchat");
  data.append("cloud_name", "ddtagvynp");

  const image = await axios.post(path, data);
  return image;
};

export default imageUpload;
