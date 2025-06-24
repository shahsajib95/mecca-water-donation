import React from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
// import './TextAreaWithToolbar.scss';

const TextFormatting = (props: any) => {
  const {
    placeholder,
    handleChange,
    height,
    list,
    value,
    handleBlur,
    quillRef,
    disabled
  } = props;

  const modules = React.useMemo(
    () => ({
      toolbar: [
        [{ header: [1, 2, false] }],
        ["bold", "italic", "underline", "strike", "blockquote"],
        [{ list: "ordered" }, { list: "bullet" }],
        ["link"],
      ],
    }),
    [],
  );
  return (
    <div className="drTextareaDiv" style={{ height: height }}>
      <ReactQuill
        theme="snow"
        ref={quillRef}
        modules={modules}
        formats={[
          "header",
          "bold",
          "italic",
          "underline",
          "strike",
          "blockquote",
          "list",
          "bullet",
          "indent",
          "link",
          "image",
          "mention",
        ]}
        onChange={handleChange}
        onBlur={handleBlur}
        placeholder={placeholder}
        readOnly={disabled}
        value={value}
      ></ReactQuill>
    </div>
  );
};

export default TextFormatting;
