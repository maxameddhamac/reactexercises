import { useState } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  NavLink,
  useSearchParams,
  useNavigate,
  useParams,
  Link,
} from "react-router-dom";
import { initialPosts } from "./data/post";

// --- NAVBAR COMPONENT ---
function Navbar({ isLoggedIn, setIsLoggedIn }) {
  return (
    <nav className="flex items-center justify-between p-6 max-w-5xl mx-auto">
      <div className="flex items-center gap-4">
        <NavLink
          to="/"
          className={({ isActive }) =>
            `px-4 py-2 rounded-lg font-semibold text-sm transition-colors ${
              isActive
                ? "bg-[#3b82f6] text-white"
                : "text-gray-700 hover:bg-gray-100"
            }`
          }
        >
          Home
        </NavLink>
        <NavLink
          to="/create"
          className={({ isActive }) =>
            `px-4 py-2 text-sm font-semibold transition-colors ${
              isActive ? "text-[#3b82f6]" : "text-gray-700 hover:text-gray-900"
            }`
          }
        >
          Create Post
        </NavLink>
      </div>

      {isLoggedIn && (
        <button
          onClick={() => setIsLoggedIn(false)}
          className="bg-[#ef4444] hover:bg-[#dc2626] text-white px-5 py-2 rounded-lg text-sm font-semibold transition-colors"
        >
          Logout
        </button>
      )}
    </nav>
  );
}

// --- HOME / BLOG POSTS PAGE ---
function Home({ posts }) {
  const [searchParams, setSearchParams] = useSearchParams();
  const query = searchParams.get("search") || "";
  const [searchInput, setSearchInput] = useState(query);

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchInput.trim()) {
      setSearchParams({ search: searchInput.trim() });
    } else {
      setSearchParams({});
    }
  };

  // Filter posts based on search query
  const filteredPosts = posts.filter((post) =>
    post.title.toLowerCase().includes(query.toLowerCase()),
  );

  return (
    <div className="max-w-4xl mx-auto mt-4 px-4">
      <h1 className="text-2xl font-bold text-gray-800 mb-6">React Blog</h1>

      <div className="bg-white rounded-2xl p-8 shadow-sm border border-gray-100 min-h-[350px]">
        <h2 className="text-base font-semibold text-gray-800 mb-3">
          Blog Posts
        </h2>

        {/* Search Form */}
        <form onSubmit={handleSearch} className="space-y-3 mb-6">
          <input
            type="text"
            value={searchInput}
            onChange={(e) => setSearchInput(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:border-blue-500"
            placeholder="Search posts..."
          />
          <button
            type="submit"
            className="w-full bg-[#3b82f6] hover:bg-[#2563eb] text-white font-medium py-2 rounded-lg text-sm transition-colors"
          >
            Search
          </button>
        </form>

        {/* Blog Post Links */}
        <div className="space-y-3">
          {filteredPosts.length > 0 ? (
            filteredPosts.map((post) => (
              <div key={post.id}>
                <Link
                  to={`/post/${post.id}`}
                  className="text-[#3b82f6] hover:underline text-sm font-medium"
                >
                  {post.title}
                </Link>
              </div>
            ))
          ) : (
            <p className="text-sm text-gray-500">No blog posts found.</p>
          )}
        </div>
      </div>
    </div>
  );
}

function PostDetails({ posts }) {
  const { postId } = useParams();
  const post = posts.find((item) => String(item.id) === postId);

  if (!post) {
    return (
      <div className="max-w-4xl mx-auto mt-4 px-4">
        <p className="text-sm text-gray-500">Post not found.</p>
      </div>
    );
  }

  return (
    <article className="max-w-4xl mx-auto mt-4 px-4">
      <div className="bg-white rounded-2xl p-8 shadow-sm border border-gray-100">
        <h1 className="text-2xl font-bold text-gray-800 mb-4">{post.title}</h1>
        <p className="text-gray-600 whitespace-pre-wrap">{post.content}</p>
      </div>
    </article>
  );
}

// --- CREATE POST PAGE ---
function CreatePost({ setPosts }) {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!title || !content) return;

    const newPost = {
      id: Date.now(),
      title,
      content,
    };

    setPosts((prev) => [newPost, ...prev]);
    navigate("/");
  };

  return (
    <div className="max-w-4xl mx-auto mt-4 px-4">
      <h1 className="text-2xl font-bold text-gray-800 mb-6">Create New Post</h1>
      <div className="bg-white rounded-2xl p-8 shadow-sm border border-gray-100">
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-xs font-semibold text-gray-700 mb-1">
              Title
            </label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:border-blue-500"
              required
            />
          </div>
          <div>
            <label className="block text-xs font-semibold text-gray-700 mb-1">
              Content
            </label>
            <textarea
              rows="5"
              value={content}
              onChange={(e) => setContent(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:border-blue-500"
              required
            ></textarea>
          </div>
          <button
            type="submit"
            className="bg-[#3b82f6] text-white px-6 py-2 rounded-lg text-sm font-medium hover:bg-[#2563eb] transition-colors"
          >
            Publish
          </button>
        </form>
      </div>
    </div>
  );
}

// --- MAIN APP ---
export default function App() {
  const [posts, setPosts] = useState(initialPosts);
  const [isLoggedIn, setIsLoggedIn] = useState(true);

  return (
    <Router>
      <div className="min-h-screen bg-[#f8fafc]">
        <Navbar isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} />
        <Routes>
          <Route path="/" element={<Home posts={posts} />} />
          <Route path="/post/:postId" element={<PostDetails posts={posts} />} />
          <Route path="/create" element={<CreatePost setPosts={setPosts} />} />
        </Routes>
      </div>
    </Router>
  );
}
