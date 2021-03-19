/**
 * @name FakeLibreryReact
 * @author Dedaldino Daniel
 * @description "Reverse React API Engineering"
 */


 /**
  * @function ConverteHTML
  * @param {*} virtualNode 
  */
 function converteHTML(virtualNode) {
   
    if( typeof virtualNode === 'string' || typeof virtualNode === 'number') {
        return document.createTextNode(`${virtualNode}`);    
    }

    const $domElement = document.createElement(virtualNode.tagName);

    if(virtualNode.props.className !== undefined) {
        $domElement.className = virtualNode.props.className;
    }

    if(virtualNode.props.id !== undefined) {
        $domElement.id = virtualNode.props.id;
    }

    if(virtualNode.props.value !== undefined) {
        $domElement.value = virtualNode.props.value;
    }

    virtualNode.props.children.forEach((virtualChild) => {
        $domElement.appendChild(converteHTML(virtualChild));
    })

    return $domElement;

}

/**
 * @funtion render
 * @param {*} initalVirtualTree 
 * @param {*} $domRoot 
 */
function render(initalVirtualTree, $domRoot) {
    const $appHTML = converteHTML(initalVirtualTree);
    $domRoot.appendChild($appHTML);

}

/**
 * @function createElement
 * @param {*} elementType 
 * @param {*} props 
 * @param  {...any} children 
 */
function createElement(elementType, props, ...children) {
    const virtualElementProps = {
        ...props,
        children
    }

    if(typeof elementType === "function") {
        return elementType(virtualElementProps);
    }

    return {
        tagName: elementType,
        props: virtualElementProps
    };
}

/**
 * @libriry React
 */
const React = {
    createElement,
};

//* Using *//

function App() {
    return (

        <section className= 'App' id="main-section">
            <h1>Contador Jsx</h1>
            <div>
                <div>0</div>
                <button className="btn-incrment" value="23">Incrementar</button>
                <button className="btn-decrement">Decrementar</button>
            </div>
        </section>
    );
}

render(React.createElement(App, null), document.querySelector('#root'));