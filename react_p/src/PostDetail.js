import {Link, useNavigate, useParams} from "react-router-dom";
import "./css/detail.css"
import {useEffect, useState} from "react";
import axios from "axios";

let PostDetail = () => {
    const navigate = useNavigate();
    const {id} = useParams();

    let [post, setPost] = useState({
        title: "",
        content: ""
    })

    const getPost = () => {
        axios.get(`${process.env.REACT_APP_API_URL}/posts/${id}`)
            .then(res => {
                console.log(res.data);
                setPost(res.data);
            }).catch(err => {
            console.error(err);
        })
    }


    useEffect(() => {
        getPost();
    }, []);


    const handleDelete = () => {
        if (!window.confirm('정말 삭제하시겠습니까?')) {
            return;
        }

        axios.delete(`${process.env.REACT_APP_API_URL}/posts/${id}`)
            .then(res => {
                console.log(res.data);
                alert("게시글이 삭제 되었습니다.")
                navigate("/")
            }).catch(err => {
                console.error(err);
            alert("게시글 삭제중 오류가 발생했습니다")
        })


    }

    return (
        <div className={"post-detail-container"}>
            <h1 className={"post-detail-title"}>{post.title}</h1>
            <p className={"post-detail-content"}>{post.content}</p>
            <div className={"button-group"}>
                <Link to={`/post/edit/${id}`} className={"edit-button"}>수정하기</Link>
                <button onClick={handleDelete} className={"delete-button"}>삭제하기</button>
            </div>
            <Link to={"/"} className={"back-link"}>목록으로 돌아가기</Link>
        </div>
    )
}
export default PostDetail;