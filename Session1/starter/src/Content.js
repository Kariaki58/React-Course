import ItemList from './ItemList'

const Content = ({items, handleCheck, handleDelete}) => {
  return (
    <main>
        {items.length ? (
        <ul>
            {items.map(item => (
                <ItemList key={item.id} item={item} handleCheck={handleCheck} handleDelete={handleDelete} />
            ))}
        </ul>
        ): (
            <p style={{marginTop: '2rem'}}>Your list is empty</p>
        )}
    </main>
  )
}

export default Content
