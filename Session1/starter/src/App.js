import React, { useState, useEffect } from 'react'
import SearchItem from './SearchItem'
import Header from './Header';
import Content from './Content';
import Footer from './Footer';
import AddItem from './AddItem'
import apiRequest from './apiRequest'

function App() {
  const API_URL = 'http://localhost:3500/items'

  const [items, setItems] = useState([]);
  const [newItem, setNewItem] = useState('')
  const [search, setSearch] = useState('')
  const [fetchError, setFetchError] = useState(null)
  const [isloading, setIsLoading] = useState(true)
  
  useEffect(() => {
    const fetchItem = async () => {
      try {
        const response = await fetch(API_URL)
        if (!response.ok) throw Error('An error occur')
        const listItems = await response.json()
        setItems(listItems)
        setFetchError(null)
      } catch(err) {
        setFetchError(err.message)
      } finally {
        setIsLoading(false)
      }
    }
    setTimeout(() => {
      fetchItem()
    }, 2000);
  }, [])

  const addItem = async (item) => {
    const id = items.length ? items[items.length - 1].id + 1 : 1;
    const myNewItem = {id, checked: false, item}
    const listItems = [...items, myNewItem];
    setItems(listItems)

    const postOptions = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(myNewItem)
    }
    const result = await apiRequest(API_URL, postOptions)
    if (result) {
      setFetchError(result)
    }
  }

  const handleCheck = async (id) => {
    const listItems = items.map(item => item.id === id ? {...item, checked: !item.checked}: item)
    setItems(listItems)

    const myItem = listItems.filter(item => item.id === id)
    const updateMethod = {
      method: 'PATCH',
      header: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({checked: myItem[0].checked})
    }
    const reqUrl = `${API_URL}/${id}`
    const result = await apiRequest(reqUrl, updateMethod)
    if (result)
      setFetchError(result)
  }

  const handleDelete = async (id) => {
    const listItems = items.filter(item => item.id !== id)
    setItems(listItems)

    const deleteOption = {
      method: 'DELETE'
    }
    const reqURL = `${API_URL}/${id}`
    const result = await apiRequest(reqURL, deleteOption)
    if (result)
      setFetchError(result)
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    if (!newItem) return;
    addItem(newItem)
    setNewItem('')
  }

  return (
    <div className="App">
      <Header title="Groceries List"/>
      <SearchItem search={search} setSearch={setSearch}/>
      <AddItem newItem={newItem} setNewItem={setNewItem} handleSubmit={handleSubmit}/>
      <main>
        {isloading && <p>Loading Items...</p>}
        {fetchError && (<p style={{ color: 'red' }}>{`${fetchError}`}</p>)}
        {!fetchError && !isloading && (<Content items={items.filter(item => ((item.item).toLowerCase()).includes(search.toLowerCase()))} 
        setItems={setItems} handleCheck={handleCheck} handleDelete={handleDelete}/>)
        }
      </main>

      <Footer length={items.length}/>
    </div>
  );
}

export default App;
