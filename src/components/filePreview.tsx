import { FileInput } from "lucide-react";
import {
  AlertDialog,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { useState } from "react";
import { PageLoader } from "./loader/page-loader";
import EmlViewer from "./emlViewer";

export default function FilePreview({ attachment }: { attachment: string }) {
  const [loading, setLoading] = useState(true);
  return (
    <div>
      {attachment?.includes("image") ||
      attachment?.includes(".jpg") ||
      attachment?.includes(".jpeg") ||
      attachment?.includes(".png") ? (
        <img
          src={attachment}
          alt={"File"}
          style={{
            cursor: "pointer",
            width: "200px",
            height: "200px",
            objectFit: "cover",
          }}
          className="border"
        />
      ) : attachment?.includes(".pdf") || attachment?.includes(".xlsx") ? (
        <div
          className="fw-bold align-center items-center  justify-center border text-center"
          style={{ width: "200px", height: "200px" }}
        >
          <div className="mt-10">
            <span>
              {attachment
                ?.split("https://fm-tool.s3.ap-south-1.amazonaws.com/")?.[1]
                ?.substring(0, 18)}
              ...
            </span>
            <br></br>
            <AlertDialog>
              <AlertDialogTrigger>
                <small>Click to Preview</small>
              </AlertDialogTrigger>
              <AlertDialogContent>
                <AlertDialogHeader>
                  <AlertDialogTitle>
                    <div className="break-all">
                      {
                        attachment?.split(
                          "https://fm-tool.s3.ap-south-1.amazonaws.com/",
                        )?.[1]
                      }
                    </div>
                  </AlertDialogTitle>
                  <AlertDialogDescription>
                    {attachment?.includes("image") ||
                    attachment?.includes(".jpg") ||
                    attachment?.includes(".jpeg") ||
                    attachment?.includes(".png") ? (
                      <img
                        src={attachment}
                        alt={"File"}
                        style={{
                          cursor: "pointer",

                          objectFit: "cover",
                        }}
                        className="w-100 border"
                      />
                    ) : (
                      <>
                        {loading && (
                          <div className="flex justify-center">
                            <PageLoader />
                          </div>
                        )}
                        <iframe
                          src={`https://drive.google.com/viewerng/viewer?embedded=true&url=${attachment}`}
                          width="100%"
                          height="400px"
                          onLoad={() => setLoading(false)}
                        ></iframe>
                      </>
                    )}
                  </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                  <AlertDialogCancel>Close</AlertDialogCancel>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>
          </div>
        </div>
      ) : attachment?.includes(".eml") ? (
        <div
          className="fw-bold align-center items-center  justify-center border text-center"
          style={{ width: "200px", height: "200px" }}
        >
          <div className="mt-10">
            <span>
              {attachment
                ?.split("https://fm-tool.s3.ap-south-1.amazonaws.com/")?.[1]
                ?.substring(0, 18)}
              ...
            </span>
            <br></br>
            <AlertDialog>
              <AlertDialogTrigger>
                <small>Click to Preview</small>
              </AlertDialogTrigger>
              <AlertDialogContent>
                <AlertDialogHeader>
                  <AlertDialogTitle>
                    <div className="break-all">
                      {
                        attachment?.split(
                          "https://fm-tool.s3.ap-south-1.amazonaws.com/",
                        )?.[1]
                      }
                    </div>
                  </AlertDialogTitle>
                  <AlertDialogDescription>
                    {attachment?.includes("image") ||
                    attachment?.includes(".jpg") ||
                    attachment?.includes(".jpeg") ||
                    attachment?.includes(".png") ? (
                      <img
                        src={attachment}
                        alt={"File"}
                        style={{
                          cursor: "pointer",

                          objectFit: "cover",
                        }}
                        className="w-100 border"
                      />
                    ) : (
                      <>
                        {loading && (
                          <div className="flex justify-center">
                            <PageLoader />
                          </div>
                        )}
                        <EmlViewer emlUrl={attachment} setLoading={setLoading}/>
                      </>
                    )}
                  </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                  <AlertDialogCancel>Close</AlertDialogCancel>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>
          </div>
        </div>
      ) : (
        <div
          className="fw-bold align-center items-center  justify-center border text-center"
          style={{ width: "200px", height: "200px" }}
        >
          <div className="mt-10">
            <span className="ms-2">
              {attachment
                ?.split("https://fm-tool.s3.ap-south-1.amazonaws.com/")?.[1]
                ?.substring(0, 18)}
              ...
              <AlertDialog>
                <AlertDialogTrigger>
                  <small>Click to Preview</small>
                </AlertDialogTrigger>
                <AlertDialogContent>
                  <AlertDialogHeader>
                    <AlertDialogTitle>
                      <div className="break-all">
                        {
                          attachment?.split(
                            "https://fm-tool.s3.ap-south-1.amazonaws.com/",
                          )?.[1]
                        }
                      </div>
                    </AlertDialogTitle>
                    <AlertDialogDescription>
                      {attachment?.includes("image") ||
                      attachment?.includes(".jpg") ||
                      attachment?.includes(".jpeg") ||
                      attachment?.includes(".png") ? (
                        <img
                          src={attachment}
                          alt={"File"}
                          style={{
                            cursor: "pointer",

                            objectFit: "cover",
                          }}
                          className="w-100 border"
                        />
                      ) : (
                        <>
                          {loading && (
                            <div className="flex justify-center">
                              <PageLoader />
                            </div>
                          )}

                          <iframe
                            src={`https://drive.google.com/viewerng/viewer?embedded=true&url=${attachment}`}
                            width="100%"
                            height="400px"
                            onLoad={() => setLoading(false)}
                          ></iframe>
                        </>
                      )}
                    </AlertDialogDescription>
                  </AlertDialogHeader>
                  <AlertDialogFooter>
                    <AlertDialogCancel>Close</AlertDialogCancel>
                  </AlertDialogFooter>
                </AlertDialogContent>
              </AlertDialog>
            </span>
          </div>
        </div>
      )}
    </div>
  );
}
