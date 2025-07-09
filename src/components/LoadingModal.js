import React from "react";

export default function LoadingModal() {
  return (
    <section style={styled.modalContainer}>
      <div style={styled.modalContent}></div>
    </section>
  );
}

const styled = {
  modalContainer: {
    position: "fixed",
    top: 0,
    left: 0,
    width: "100%",
    height: "100%",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  modalContent: {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: "300px",
    height: "200px",
    backgroundColor: "white",
    padding: "20px",
    borderRadius: "8px",
  },
};
