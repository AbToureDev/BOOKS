import React, {useState} from 'react';
import {connect} from "react-redux";
import {addBooksAction,deleteBooksAction,deleteAllBooksAction} from "../Redux/Actions";
import FlipMove from 'react-flip-move';
function AddBook({libraryData,actionAddBook,deleteBook,deleteAllBook}) {
    const initialState ={
        title: '',
        auteur:''
    }
    const [newData, setNewData] =useState(initialState);
    const handleSubmit=(e)=>{
        e.preventDefault();
        actionAddBook(newData)
        setNewData(initialState)
    }


    const dispalyData=libraryData.length > 0 ?
        <FlipMove>
            {
                libraryData.map(data=>{
                    return (
                        <li className="list-group-item list-group-item-light d-flex justify-content-between mt-3" key={data.id}>
                            <span ><strong>Titre: </strong>{data.title}</span>
                            <span ><strong>Auteur: </strong>{data.auteur}</span>
                            <span className="btn btn-danger" onClick={()=>deleteBook(data.id)}><strong>X</strong></span>
                        </li>
                    )
                })
            }
        </FlipMove>
     :(<p className="text-center mt-4 ">Aucune donnée à afficher</p>)

    const deleteAllBooks = libraryData.length > 0 && (
        <button className="btn btn-danger mt-4 mb-2" onClick={()=>deleteAllBook()}>
            Effacer tous les libre
        </button>
    )

    return (
        <main role="main">
            <div className="jumbotron jumbotron-fluid flex-row">
                <div className="container text-center">
                    <h1 className="display-4">Books</h1>
                    <p>Ajouter un livre a votre bibliothèque</p>
                    <form className="form-inline justify-content-center " onSubmit={handleSubmit}>
                        <div className="form-group">
                            <input type="text" className="form-control mb-2" placeholder="Books title"
                                   value={newData.title}
                                   onChange={(e)=>setNewData({...newData, title: e.target.value})}
                                   required
                            />
                            {/*{console.log(newData.title,newData.auteur)}*/}
                        </div>
                        <div className="form-group"> 
                            <input type="text" className="form-control ml-3 mb-2" placeholder="Auteur"
                                   value={newData.auteur}
                                   onChange={(e)=>setNewData({...newData, auteur: e.target.value})}
                                   required />
                        </div>
                        <div className="form-group">
                            <button className="btn btn-outline-secondary ml-3">Ajouter un livre</button>
                        </div>
                    </form>
                </div>
            </div>
            <div className="container" style={{minHeight:'200px',}}>
                <div className="row">
                    <div className="col-md-12">
                        <ul className="list-group">
                            {dispalyData}
                        </ul>
                        <div className="d-flex justify-content-center ">
                            {deleteAllBooks}
                        </div>
                    </div>
                </div>
            </div>
        </main>
    );
}
const mapStateToProps = (state)=>{
    return{
        libraryData:state.library
    }
}
const mapDispatchToProps = (dispatch)=>{
    return {
        actionAddBook:(param)=>dispatch(addBooksAction(param)),
        deleteBook:(id)=>dispatch(deleteBooksAction(id)),
        deleteAllBook:()=>dispatch(deleteAllBooksAction()),

}
}
export default connect(mapStateToProps,mapDispatchToProps)(AddBook);