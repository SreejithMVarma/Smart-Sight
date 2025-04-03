import { useState } from "react";
import { motion } from "framer-motion";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Sun, Moon, X } from "lucide-react";
import axios from "axios";
import { API_BASE_URL } from "@/config";

const Contribute = () => {
  const [image, setImage] = useState<File | null>(null);
  const [caption, setCaption] = useState("");
  const [darkMode, setDarkMode] = useState(false);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setImage(e.target.files[0]);
    }
  };

  const handleDrop = (e: React.DragEvent<HTMLLabelElement | HTMLDivElement>) => {
    e.preventDefault();
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      setImage(e.dataTransfer.files[0]);
    }
  };

  const handleUpload = async () => {
    if (!image || !caption.trim()) {
      alert("Please upload an image and enter a caption.");
      return;
    }
  
    if (caption.split(" ").length > 77) {
      alert("Caption exceeds 77 tokens.");
      return;
    }
  
    // Ensure only JPG/JPEG files are accepted
    if (!image.type.match(/^image\/jpeg$/)) {
      alert("Only JPEG/JPG images are allowed.");
      return;
    }
  
    const formData = new FormData();
    formData.append("image", image);
    formData.append("caption", caption);
  
    try {
      const response = await axios.post(`${API_BASE_URL}/contribute/`, formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
  
      alert(response.data.message);
      setImage(null);
      setCaption("");
    } catch (error) {
      console.error("Upload error:", error);
      alert("Failed to upload. Please try again.");
    }
  };
  


  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className={`flex flex-col items-center justify-center min-h-screen p-4 relative ${
        darkMode ? "bg-black text-white" : "bg-gray-100 text-black"
      }`}
      onDragOver={(e) => e.preventDefault()}
      onDrop={handleDrop}
      style={darkMode ? { background: "black url('/stars-bg.png') repeat", backgroundSize: "cover" } : {}}
    >
      <Button onClick={() => setDarkMode(!darkMode)} className="absolute top-4 right-4 flex items-center gap-2">
        {darkMode ? <Sun /> : <Moon />} {darkMode ? "Light Mode" : "Dark Mode"}
      </Button>

      <motion.div initial={{ scale: 0.9 }} animate={{ scale: 1 }} transition={{ duration: 0.5 }}>
        <Card
          className={`w-full max-w-md p-6 shadow-lg rounded-2xl ${
            darkMode ? "bg-gray-800 text-white" : "bg-white text-black"
          }`}
        >
          <CardContent>
            <h2 className="text-2xl font-bold text-center mb-4">Contribute to SMARTSIGHT</h2>

            {!image ? (
              <motion.label
                initial={{ opacity: 0, y: -10, scale: 0.9 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                transition={{ duration: 0.5 }}
                whileHover={{ scale: 1.05 }}
                className="border-dashed border-2 border-gray-400 p-4 text-center mb-4 cursor-pointer flex flex-col items-center justify-center h-32"
                onDragOver={(e) => e.preventDefault()}
                onDrop={handleDrop}
              >
                <input type="file" accept="image/*" onChange={handleImageChange} className="hidden" />
                <p>Click here or Drag & Drop an image</p>
              </motion.label>
            ) : (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5 }}
                className="relative mb-4 flex items-center justify-center border p-2 rounded-lg w-full h-32 overflow-hidden"
              >
                <img src={URL.createObjectURL(image)} alt="Preview" className="h-full object-cover rounded-lg" />
                <Button
                  onClick={() => setImage(null)}
                  className="absolute top-1 right-1 bg-white text-black p-1 rounded-full w-5 h-5 flex items-center justify-center shadow-md"
                >
                  <X size={12} />
                </Button>
              </motion.div>
            )}

            <Input
              type="text"
              placeholder="Enter caption (Max 77 tokens)"
              value={caption}
              onChange={(e) => setCaption(e.target.value)}
              className={`mb-4 ${darkMode ? "text-white bg-gray-700" : ""}`}
            />

            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Button onClick={handleUpload} className="w-full">
                Upload
              </Button>
            </motion.div>
          </CardContent>
        </Card>
      </motion.div>
    </motion.div>
  );
};

export default Contribute;
