import React from 'react'
import { Link, useParams, useNavigate } from 'react-router-dom'
import { useStoreActions, useStoreState } from 'easy-peasy'
import { format } from 'date-fns'
import { useEffect } from 'react'

const EditPost = () => {
    const editTitle = useStoreState((state) => state.editTitle)
    const editBody = useStoreState((state) => state.editBody) 

    const editPost = useStoreActions((actions) => actions.editPost)
    const setEditTitle = useStoreActions((actions) => actions.setEditTitle)
    const setEditBody = useStoreActions((actions) => actions.setEditBody)

    const { id } = useParams()

    const getPostById = useStoreState((state) => state.getPostById);
    const post = getPostById(id)
  
    const history = useNavigate()

    useEffect(() => {
        if (post) {
            setEditTitle(post.title);
            setEditBody(post.body)
        }
    }, [post, setEditTitle, setEditBody])

    const handleEdit = (id) => {
        const datetime = format(new Date(), 'MMMM dd, yyyy pp');
        const updatePost = { id, title: editTitle, datetime, body: editBody };

        editPost(updatePost)
        history(`/post/${id}`)
    }
        
  return (
    <main className='NewPost'>
        {editTitle && 
        <form className='newPostForm' onSubmit={(e) => e.preventDefault()}>
            <label htmlFor="postTitle">Title:</label>
            <input type="text" id='postTitle' required value={editTitle} onChange={(e) => setEditTitle(e.target.value)}/>
            <label htmlFor="postBody">Post:</label>
            <textarea id='postBody' required value={editBody} onChange={(e) => setEditBody(e.target.value)}></textarea>
            <button type='button' onClick={() => handleEdit(post.id)}>Submit</button>
        </form>
        }
        {!editTitle && 
            <>
                <h2>Post Not Found</h2>
                <p>Well, that's disappointing</p>
                <p>
                    <Link to='/'>Visit oUR Homepage</Link>
                </p>
            </>
        }
    </main>
    
  )
}

export default EditPost
