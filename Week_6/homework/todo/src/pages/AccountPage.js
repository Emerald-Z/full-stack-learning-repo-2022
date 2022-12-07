import { Stack, Title, Button } from "@mantine/core";
import { useNavigate } from "react-router-dom";
import { useEffect, useState, Fragment } from "react";
import FileUploadComponent from "../components/FileUploadComponent";
import storage from "../components/Firebase/firebase"
import { ref, getDownloadURL } from "firebase/storage";

export default function AccountPage() {
  const navigate = useNavigate(); 

  const navigateHome = () => {
    navigate('/');
  }

  //let token = localStorage.getItem("token");
  let email = localStorage.getItem("username");

  const [pfp, setPfp] = useState("");

  //submit file
  const handleSubmission = (selectedFile) => {
    const formData = new FormData();
    formData.append("demo_image", selectedFile); //set in express.js

    fetch("http://localhost:4000/file/", {
      method: "POST",
      body: formData,
    })
      .then((response) => response.json())
      .then((result) => {
        setIsShown(false);
        console.log("Success:", result);
        //downloadImage(result);
      })
      .catch((error) => {
        console.error("Error:", error);
      });
    
  };

  async function downloadImage(filename) {
    const storageRef = ref(storage, filename);
    const url = await getDownloadURL(storageRef);
    setPfp(url);
  }

  //delete image

  const [isShown, setIsShown] = useState(false);
  const showUpload = event => {
    setIsShown(current => !current);
  }

  //if request.auth != null;
  useEffect(() => {
    downloadImage(localStorage.getItem("pfp"));
  }, [])

  return (
    <div>
        <Button onClick={navigateHome}>Home</Button>
        <img src={pfp} alt="pfp" width="300" height="200"></img>
        <Title>${email}'s Account</Title>
        <Stack>
            <h3>username:</h3>
        </Stack>
        <Button onClick={showUpload}>change profile photo</Button>
        {isShown && (
          <FileUploadComponent handleSubmission={handleSubmission}></FileUploadComponent>
        )}
    </div>

  );

}
