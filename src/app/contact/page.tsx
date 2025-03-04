"use client";

import { useState, useRef } from "react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { 
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
  CardFooter
} from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { MailOpen, Paperclip, FileUp, X } from "lucide-react";
import { useLocale } from "../../hooks/useLocals";
import { t } from "../../utils/i18n";

const ContactPage = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    company: "",
    message: ""
  });
  const [file, setFile] = useState(null);
  const [fileName, setFileName] = useState("");
  const fileInputRef = useRef(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    if (selectedFile) {
      // Check if file is a PDF
      if (selectedFile.type !== 'application/pdf') {
        toast.error("Only PDF files are accepted");
        return;
      }
      
      // Check file size (5MB max)
      if (selectedFile.size > 5 * 1024 * 1024) {
        toast.error("File size should be less than 5MB");
        return;
      }
      
      setFile(selectedFile);
      setFileName(selectedFile.name);
    }
  };

  const handleFileRemove = () => {
    setFile(null);
    setFileName("");
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const formDataToSend = new FormData();
      formDataToSend.append("name", formData.name);
      formDataToSend.append("email", formData.email);
      formDataToSend.append("company", formData.company);
      formDataToSend.append("message", formData.message);
      formDataToSend.append("recipientEmail", "hamzagroup145@gmail.com");
      
      if (file) {
        formDataToSend.append("cv", file);
      }

      const response = await fetch("/api/send-email", {
        method: "POST",
        body: formDataToSend,
        // Remove the Content-Type header to let the browser set it with boundary for FormData
      });

      if (response.ok) {
        toast.success("Message sent successfully!", {
          description: "We'll get back to you as soon as possible."
        });
        // Reset form
        setFormData({
          name: "",
          email: "",
          company: "",
          message: ""
        });
        handleFileRemove();
      } else {
        throw new Error("Failed to send message");
      }
    } catch (error) {
      toast.error("Failed to send message", {
        description: "Please try again later or contact us directly."
      });
    } finally {
      setIsSubmitting(false);
    }
  };
    const { locale } = useLocale();
  return (
    <div className="flex flex-row min-h-screen bg-white dark:bg-gray-950">
      {/* Side Image */}
      <div className="w-1/2 overflow-hidden hidden lg:block">
        <img 
          src="/images/contact-us.jpg" 
          alt="Contact us" 
          className="object-cover w-full h-full"
        />
      </div>

      {/* Contact Content */}
      <div className="w-full lg:w-1/2 flex flex-col items-center justify-center px-4 py-16 lg:px-8">
        <div className="mb-8 text-center">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-gray-100">
            {t("contactus.title", locale)}
            <MailOpen className="inline-block ml-2 text-yellow-400" size={32} />
          </h1>
          <p className="mt-2 text-gray-600 dark:text-gray-400">
          {t("contactus.subtitle", locale)}
          </p>
        </div>

        <Card className="w-full max-w-md bg-gradient-to-br from-white to-gray-50 dark:from-gray-900 dark:to-gray-950 border border-gray-200 dark:border-gray-800 shadow-lg">
          <CardHeader>
            <CardTitle className="text-xl font-semibold text-gray-900 dark:text-gray-100">{t("contactus.formhead", locale)}</CardTitle>
            <CardDescription>
            {t("contactus.formsubtitle", locale)}
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="name">{t("contactus.formin1", locale)}</Label>
                <Input 
                  id="name"
                  name="name"
                  placeholder="Your full name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  className="border-gray-300 dark:border-gray-700 focus:ring-2 focus:ring-purple-500 dark:focus:ring-purple-400"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="email">{t("contactus.formin2", locale)}</Label>
                <Input 
                  id="email"
                  name="email"
                  type="email"
                  placeholder="your.email@example.com"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className="border-gray-300 dark:border-gray-700 focus:ring-2 focus:ring-purple-500 dark:focus:ring-purple-400"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="company">{t("contactus.formin3", locale)}</Label>
                <Input 
                  id="company"
                  name="company"
                  placeholder="Your company name"
                  value={formData.company}
                  onChange={handleChange}
                  className="border-gray-300 dark:border-gray-700 focus:ring-2 focus:ring-purple-500 dark:focus:ring-purple-400"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="message">{t("contactus.formin4", locale)}</Label>
                <Textarea 
                  id="message"
                  name="message"
                  placeholder="Tell us about your project or inquiry..."
                  rows={5}
                  value={formData.message}
                  onChange={handleChange}
                  required
                  className="border-gray-300 dark:border-gray-700 focus:ring-2 focus:ring-purple-500 dark:focus:ring-purple-400"
                />
              </div>
              
              {/* CV Upload Section */}
              <div className="space-y-2">
                <Label htmlFor="cv">{t("contactus.formin5", locale)}</Label>
                <div className="mt-1 flex items-center">
                  <Input
                    id="cv"
                    name="cv"
                    type="file"
                    accept=".pdf"
                    onChange={handleFileChange}
                    ref={fileInputRef}
                    className="hidden"
                  />
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => fileInputRef.current?.click()}
                    className="flex items-center border border-gray-300 dark:border-gray-700 focus:ring-2 focus:ring-purple-500 dark:focus:ring-purple-400"
                  >
                    <Paperclip className="mr-2 h-4 w-4" />
                    Attach CV
                  </Button>
                  {fileName && (
                    <div className="ml-3 flex items-center bg-gray-100 dark:bg-gray-800 rounded-md p-2 text-sm">
                      <FileUp className="mr-2 h-4 w-4 text-gray-600 dark:text-gray-400" />
                      <span className="truncate max-w-[200px]">{fileName}</span>
                      <button
                        type="button"
                        onClick={handleFileRemove}
                        className="ml-2 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
                      >
                        <X className="h-4 w-4" />
                      </button>
                    </div>
                  )}
                </div>
                <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                {t("contactus.cvpurpose", locale) }
                </p>
              </div>
              
              <Button 
                type="submit" 
                className="w-full bg-gradient-to-r from-purple-600 to-blue-500 hover:from-purple-700 hover:to-blue-600 text-white font-medium py-2 rounded-md transition-all duration-300"
                disabled={isSubmitting}
              >
                {isSubmitting ? t("contactus.formbtnactive", locale)  : t("contactus.formbtn", locale)}
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default ContactPage;