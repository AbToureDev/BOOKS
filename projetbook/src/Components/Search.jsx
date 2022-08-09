import React, {useState} from 'react';
import { useDispatch, useSelector} from "react-redux";
import {apigoogleBook} from "../Redux/Actions";
import {addBooksAction,deleteBooksAction, } from "../Redux/Actions";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function Search(props) {
    const [search, setSearch]=useState("");
    const state=useSelector(state=>state.rechercher)
    const dispatch=useDispatch()
    const notify = () => toast("Le livre a bien été enregistrer!");

    console.log(state)
    const handleSubmit=(e)=>{
        e.preventDefault();
        dispatch(apigoogleBook(search));
        setSearch("")
        // console.log(search)
    }
    const handleSave=(title,auteur)=>{
        const bookSave ={
            title: title,
            auteur: auteur,
        }
        dispatch(addBooksAction(bookSave))
        // alert("Le livre a été enregistre")
        notify()
    };
    const affichage=state.isLoading ? (
        <div className="d-flex justify-content-center">
            <div className="spinner-border text-info" role="status">
                <span className="sr-only">Loading...</span>
            </div>
        </div>
        ): state.error !== '' ? (
            <p>{state.error}</p>
    )
        :
        (
            state.fetchBook.map(dt=>{
                return(
                    // console.log(dt.volumeInfo.imageLinks.thumbnail),
                    <div className="card mb-2" key={dt.id}>
                        <div className="card-header">
                            <h5 className='mb-0'>
                                <button className="btn btn-link collapsed"
                                        data-toggle="collapse"
                                        data-target={`#${dt.id}`}
                                        aria-expanded="false"
                                >
                                    {dt.volumeInfo.title}
                                </button>
                            </h5>
                        </div>
                        <div id={dt.id} className="collapsed" data-parent="#accordion">
                            <div className="card-body">
                                {dt.volumeInfo.hasOwnProperty('imageLinks')&&
                                    <img src={dt.volumeInfo.imageLinks.thumbnail} alt={dt.volumeInfo.title}/>
                                }
                                <br/>
                                <h4 className="card-title">VolumeTitre: {dt.volumeInfo.title}</h4>
                                <h5 className="card-title">Auteurs: {dt.volumeInfo.authors}</h5>
                                <p className="card-text"> {dt.volumeInfo.description}</p>
                                <a target="_blank" rel="noopener noreferrer"
                                   className="btn btn-outline-secondary"
                                   href={dt.volumeInfo.previewLink}
                                > plus d'infos </a>
                                <button className="btn btn-outline-secondary m-lg-2" onClick={()=>handleSave(dt.volumeInfo.title,dt.volumeInfo.authors)}> Enregistrer</button>
                            </div>
                        </div>
                    </div>
                )
            })

        )


    return (
        <main role="main">
            <div className="jumbotron jumbotron-fluid flex-row">
                <div className="container text-center">
                    <h1 className="display-4">Books</h1>
                    <p>Indiquer le livre à rechercher sur google API</p>
                    <form className="form-inline justify-content-center " onSubmit={handleSubmit}>
                        <div className="form-group">
                            <input type="text" className="form-control mb-2" placeholder="Search..."
                                   value={search}
                                   onChange={(e)=>setSearch(e.target.value)}
                                   required
                            />
                        </div>
                        <div className="form-group">
                            <button className="btn btn-outline-secondary ml-3">Search</button>
                        </div>
                    </form>
                </div>
            </div>
            <div className="container mt-2" style={{minHeight:"200px"}}>
                <div id="accordion">
                    <ToastContainer />
                    {affichage}
                </div>
            </div>
        </main>
    );
}


export default Search;