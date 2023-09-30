import React,{useState,useEffect} from 'react';
import './index.css';
import List from './components/List';
import { useAuth0 } from "@auth0/auth0-react";


const getLocalStorage=() => {
  let list=localStorage.getItem("list");
  if(list)
  {
    return (list=JSON.parse(localStorage.getItem("list")));

  }
  else
  {
    return [];
  }
};

const ToDo = () => {

  const [name,setName]=useState("");
  const [list,setList]=useState(getLocalStorage());
  const [isEditing,setIdEditing]=useState(false);
  const [editId,setEditId]=useState(null); 
  const { logout } = useAuth0();
 
  useEffect(() => {
    localStorage.setItem("list", JSON.stringify(list));
  }, [list]);

  const handleSubmit= (e) => {
    e.preventDefault();
    if(name && isEditing) {
      setList(
        list.map((item) => {
          if(item.id===editId) {
            return { ...item, title:name};
          }
          return item;
        })
      )
      setName("");
      setEditId(null);
      setIdEditing(false);
    }
    else
    {
      const newItem={ id: new Date().getTime().toString(), title: name};
      setList([...list,newItem]);
      setName("");
    }
  };
  const removeItem= (id) => {
    setList(list.filter((item) => item.id !==id));
  };
  const editItem= (id) => {
    const editItem=list.find((item) => item.id === id);
    setIdEditing(true);
    setEditId(id);
    setName(editItem.title);
  };
  const clearList= () => {
    setList([]);
  };

  return (
    
    <section className="section-center">

    <div className="logoutA">  
    <button onClick={() => logout({ logoutParams: { returnTo: window.location.origin } })}>
      Log Out
    </button>
    </div>

      <form onSubmit={handleSubmit}>
        <h3 style={{marginBottom: "1.5rem", textAlign: "center"}}>
          ToDo List using Local Storage
        </h3>
        <div className="mb-3 form">
          <input type="text" className="form-control" placeholder="e.g. Bread" onChange={(e) => setName(e.target.value)} value={name} />
          <button type="submit" className="btn btn-success">
            {isEditing ? "Edit":"Submit"}
          </button>
        </div>
      </form>
      {
        list.length>0 && (
          <div style={{marginTop: "2rem"}}>
            <List items={list} removeItem={removeItem} editItem={editItem} />
            <div className="text-center">
              <button className="btn btn-warning" onClick={clearList}>
                Clear Items
              </button>
            </div>
          </div>
        )
      }
    </section>
  )
}

export default ToDo;
