import React, {useState,useEffect} from "react";
import { useParams } from 'react-router-dom';
import TvDetails from "../components/tvDetails/";
import PageTemplate from "../components/templateTvShowPage";
import { useQuery } from "react-query";
import Spinner from '../components/spinner'
import { getTvShow } from "../api/movie-api";

const TvPage = (props) => {
  const { id } = useParams();
  
  const [tvShow,setTvShow] = useState([])
  const [loading, setLoading] = useState([true])

  const  { error, isError,refetch }  = useQuery("tvShow", () => getTvShow(id).then(result => {
  
    setTvShow(result)
    setLoading(false)
  }),{enabled: true }) 

  useEffect(() => { 
    refetch();
    // eslint-disable-next-line
   }, []);


  if (loading) {
    return <Spinner />;
  }

  if (isError) {
    return <h1>{error.message}</h1>;
  }

  return (
    <>
      {tvShow ? (
        <>
          <PageTemplate tvShow={tvShow} >
            <TvDetails tvShow={tvShow} />
          </PageTemplate>
        </>
      ) : (
        <p>Waiting for tv details</p>
      )}
    </>
  );
};

export default TvPage;