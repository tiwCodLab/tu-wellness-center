// file: ./component/Spinner.js
const Spinners = () => {
  return (
    <div style={{ textAlign: "center" }}>
      <div
        style={{
          width: "20px",
          height: "20px",
          borderRadius: "50%",
          border: "2px solid #cccc",
          borderTopColor: "#fff",
          animation: "spin 1s linear infinite",
          margin: "20px auto",
        }}
      ></div>
    </div>
  );
};

export default Spinners;
