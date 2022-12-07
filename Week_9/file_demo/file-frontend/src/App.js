import "./App.css";
import FileUploadPage from "./components/Upload";

function App() {
  const handleSubmission = (selectedFile) => {
    // TODO: complete function by appending "demo_image" field to formData with file, then calling upload file endpoint
    const formData = new FormData();
    formData.append("demo_image", selectedFile); //set in express.js

    fetch("http://localhost:3000/files/", {
      method: "POST",
      body: formData,
    })
      .then((response) => response.json())
      .then((result) => {
        console.log("Success:", result);
      })
      .catch((error) => {
        console.error("Error:", error);
      });
    
  };

  //download file
  const submit = () => {

  }

  return (
    <div className="App">
      <header className="App-header">
        <img src=""></img>
        <FileUploadPage handleSubmission={handleSubmission}></FileUploadPage>
        <button onClick={submit}></button>
      </header>
    </div>
  );
}

export default App;
