import axios from 'axios';
import { BASE_URL } from '../utils/constants';
import { useDispatch, useSelector } from 'react-redux';
import { addFeed } from '../utils/feedSlice';
import { useEffect } from 'react';
import UserCard from './UserCard';

const Feed = () => {
  const feed = useSelector((store) => store.feed);
  const dispatch = useDispatch();

  const getFeed = async () => {
    if (feed) return;

    try {
      const res = await axios.get(`${BASE_URL}/feed`, {
        withCredentials: true,
      });

      dispatch(addFeed(res?.data?.data));
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    getFeed();
  }, []);

  if (!feed) {
    return (
      <div className="flex justify-center py-20">
        <span className="loading loading-spinner loading-lg"></span>
      </div>
    );
  }

  if (feed.length === 0) {
    return (
      <div className="text-center py-20">
        <h2 className="text-2xl font-semibold">No new users found</h2>
        <p className="text-base-content/70 mt-2">
          Check back later for more matches.
        </p>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 py-10">
      <div className="mb-8">
        <h1 className="text-3xl font-bold">Discover People</h1>
        <p className="text-base-content/70 mt-2">
          Find and connect with amazing people.
        </p>
      </div>

      <div className="grid gap-8 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {feed.map((user) => (
          <div
            key={user._id}
            className="transition-transform duration-300 hover:-translate-y-2"
          >
            <UserCard user={user} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default Feed;