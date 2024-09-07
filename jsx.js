import $$typeof from "./shared/$$typeof"

export default class React {
  /**
   * 
   * @param {string} type 
   * @param {Record<string, any>} props 
   * @param {string | any[]} children 
   */
  static createElement(type, props, children){
    // const key = props.key ? props.key : Math.random().toString()
    return {
      $$typeof: $$typeof,
      type,
      key: Math.random(),
      props,
      children
    }
  }

  static render(jsx, container){
    container.appendChild(React.parseJsx(jsx))
  }

  static parseJsx(jsx){
    const el = document.createElement(jsx.type)

    Reflect.set(el, "$$typeof", jsx.$$typeof)

    // for(const [prop, value] in Object.entries(jsx.props)){
    //   if(prop === 'style') continue
    //   el.setAttribute(prop, value)
    // }
    if(jsx && jsx.props && jsx.props.style){
      for(const [key, value] of Object.entries(jsx.props.style)){
        el.style.setProperty(key, value)
      }
    }
    if(jsx.children){
      for(const node of jsx.children.flat(1)){
        if(typeof node === 'string' || typeof node === 'number'){
          const textNode = document.createTextNode(node)
          el.appendChild(textNode)
        }
        else el.appendChild(React.parseJsx(node))
      }
    }
    return el
  }
}