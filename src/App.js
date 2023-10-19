import "./App.css";
import React, { useLayoutEffect, useState } from "react";
import rough from "roughjs/bundled/rough.esm";

const generator = rough.generator();
function createElement(x1, y1, x2, y2, type) {
  const roughElement =
    type === "circle"
      ? generator.circle(x1, y1, x2 - x1, y2 - y1)
      : generator.rectangle(x1, y1, x2 - x1, y2 - y1);
  return { x1, y1, x2, y2, roughElement };
}
function App() {
  const [ele, setEle] = useState([]);
  const [drawing, setDrawing] = useState(false);
  const [elementType, setElementType] = useState("line");

  useLayoutEffect(() => {
    const canvas = document.getElementById("canvas");
    const context = canvas.getContext("2d");
    context.clearRect(0, 0, canvas.width, canvas.height);
    const roughCanavs = rough.canvas(canvas);
    ele.forEach(({ roughElement }) => roughCanavs.draw(roughElement));
  }, [ele]);

  const handleMouseDown = (event) => {
    setDrawing(true);
    const { clientX, clientY } = event;
    const ele = createElement(clientX, clientY, clientX, clientY, elementType);
    setEle((prevState) => [...prevState, ele]);
  };

  const handleMouseMove = (event) => {
    if (!drawing) return;

    const { clientX, clientY } = event;
    const index = ele.length - 1;
    const { x1, y1 } = ele[index];
    const updatedElement = createElement(x1, y1, clientX, clientY, elementType);
    const elecopy = [...ele];
    elecopy[index] = updatedElement;
    setEle(elecopy);
  };
  const handleMouseUp = () => {
    setDrawing(false);
  };

  return (
    <div>
      <header>Canvas</header>

      <div className="toolbar">
        <label htmlFor="circle" class="container">
          <input
            type="radio"
            id="Circle"
            checked={elementType === "circle"}
            onChange={() => setElementType("circle")}
          />
          Circle
        </label>

        <label htmlFor="rectangle" class="container">
          {" "}
          <input
            type="radio"
            id="rectangle"
            checked={elementType === "rectangle"}
            onChange={() => setElementType("rectangle")}
          />
          Rectangle
        </label>
      </div>
      <canvas
        id="canvas"
        width={window.innerWidth}
        height={window.innerHeight}
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
      ></canvas>
    </div>
  );
}

export default App;
