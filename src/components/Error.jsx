
/// Forma tradicional de pasar Props
// const Error = ({mensaje}) => {
//     return (
//         <div className="bg-red-700 text-white text-center p-3 uppercase font-bold mb3 rounded-md ">
//             <p>{mensaje}</p>
//         </div>
//     )
// }


/// Forma de pasar Props que permite pasar componentes HTML
const Error = ({children}) => {
    return (
        <div className="bg-red-700 text-white text-center p-3 uppercase font-bold mb3 rounded-md ">
            {children}
        </div>
    )
}

export default Error