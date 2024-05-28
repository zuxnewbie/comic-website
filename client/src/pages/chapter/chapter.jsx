import { useParams, useLocation } from "react-router-dom";
import ChapterContent from "../../components/chapter-content/chapter-content";
import CommentComponent from "../../components/comment/comment";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { getChapterDetail } from "../../store/actions/story";

const ChapterPage = () => {
  const { chapter_id } = useParams();
  const location = useLocation();
  const dispatch = useDispatch();
  const chapterDetail = useSelector((state) => state.story.chapter_detail);

  const queryParams = new URLSearchParams(location.search);
  const chapterNumber = queryParams.get('number');

  useEffect(() => {
    if (chapter_id) {
      dispatch(getChapterDetail(chapter_id));
    }
  }, [chapter_id, dispatch]);

  if (!chapterDetail) return <p>Loading...</p>;

  return (
    <>
      <ChapterContent chapterDetail={chapterDetail} chapterNumber={chapterNumber}/>
      <CommentComponent />
    </>
  );
};

export default ChapterPage;
