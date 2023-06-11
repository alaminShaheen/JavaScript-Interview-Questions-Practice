// Given a DOM as an object with
// type, children, and property of DOM element, write a function to convert the object to the actual DOM.

const dom = {
  type: "div",
  props: { id: "hello", class: "mah-man", title: "Meem" },
  children: [{ type: "h1", children: "Meem ekta Naim" }],
};

const root = document.getElementById("root");

function generateDOM(dom) {
  function helper(obj) {
    const { type, props, children } = obj;
    const element = document.createElement(type);

    if (props) {
      Object.entries(props).forEach(([key, value]) => {
        console.log(key, value);
        element[key] = value;
      });
    }

    if (typeof children === "string") {
      element.append(children);
    } else {
      children.forEach((child) => {
        element.appendChild(helper(child));
      });
    }
    return element;
  }

  const domElement = helper(dom);
  root.append(domElement);
}

generateDOM(dom);
