import {
  BrowserRouter as Router,
  Routes,
  Route,
  NavLink,
  Link,
  useParams,
} from "react-router-dom";
import { recipesData, categoriesData } from "./data/recipes";

// --- NAVIGATION BAR ---
function Navbar() {
  return (
    <header className="bg-white border-b border-gray-100 sticky top-0 z-50">
      <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
        <Link to="/" className="text-xl font-bold text-[#e11d48]">
          Recipe Book
        </Link>
        <nav className="flex items-center gap-6 text-sm font-semibold">
          <NavLink
            to="/"
            className={({ isActive }) =>
              isActive ? "text-[#e11d48]" : "text-gray-600 hover:text-gray-900"
            }
          >
            Home
          </NavLink>
          <NavLink
            to="/recipes"
            className={({ isActive }) =>
              isActive ? "text-[#e11d48]" : "text-gray-600 hover:text-gray-900"
            }
          >
            Recipes
          </NavLink>
          <NavLink
            to="/categories"
            className={({ isActive }) =>
              isActive ? "text-[#e11d48]" : "text-gray-600 hover:text-gray-900"
            }
          >
            Categories
          </NavLink>
        </nav>
      </div>
    </header>
  );
}

// --- 1. HOME PAGE ---
function Home() {
  return (
    <div className="min-h-[calc(100vh-64px)] bg-[#f8fafc] flex flex-col items-center justify-center p-6 text-center">
      <h1 className="text-4xl font-extrabold text-gray-900 mb-3">
        Welcome to Recipe Book
      </h1>
      <p className="text-gray-500 text-lg mb-10 max-w-md">
        Discover delicious recipes and start cooking today!
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full max-w-2xl">
        <Link
          to="/recipes"
          className="bg-[#e11d48] hover:bg-[#be123c] text-white p-8 rounded-2xl shadow-sm transition-all transform hover:-translate-y-1 text-center"
        >
          <h2 className="text-2xl font-bold mb-2">Browse Recipes</h2>
          <p className="text-red-100 text-sm">
            Explore our collection of delicious recipes
          </p>
        </Link>

        <Link
          to="/categories"
          className="bg-[#e11d48] hover:bg-[#be123c] text-white p-8 rounded-2xl shadow-sm transition-all transform hover:-translate-y-1 text-center"
        >
          <h2 className="text-2xl font-bold mb-2">Recipe Categories</h2>
          <p className="text-red-100 text-sm">Find recipes by category</p>
        </Link>
      </div>
    </div>
  );
}

// --- 2. RECIPE LIST PAGE ---
function RecipeList() {
  return (
    <div className="min-h-[calc(100vh-64px)] bg-[#f8fafc] p-8">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-2xl font-bold text-gray-900 mb-6">All Recipes</h1>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {recipesData.map((recipe) => (
            <div
              key={recipe.id}
              className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 flex flex-col justify-between"
            >
              <div>
                <h2 className="text-xl font-bold text-gray-900 mb-2">
                  {recipe.title}
                </h2>
                <p className="text-gray-500 text-sm mb-4">
                  {recipe.description}
                </p>
              </div>
              <Link
                to={`/recipes/${recipe.id}`}
                className="inline-block text-center bg-[#e11d48] hover:bg-[#be123c] text-white font-medium py-2 px-4 rounded-xl text-sm transition-colors mt-4"
              >
                View Recipe
              </Link>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

// --- 3. RECIPE DETAIL PAGE ---
function RecipeDetail() {
  const { id } = useParams();
  const recipe = recipesData.find((r) => r.id === id);

  if (!recipe) {
    return (
      <div className="p-8 text-center">
        <h2 className="text-2xl font-bold text-gray-800">Recipe Not Found</h2>
        <Link
          to="/recipes"
          className="text-[#e11d48] underline mt-4 inline-block"
        >
          Back to Recipes
        </Link>
      </div>
    );
  }

  return (
    <div className="min-h-[calc(100vh-64px)] bg-[#f8fafc] p-8 flex justify-center">
      <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100 w-full max-w-3xl self-start">
        <Link
          to="/recipes"
          className="text-[#e11d48] font-medium text-sm inline-flex items-center gap-1 mb-6 hover:underline"
        >
          ← Back to Recipes
        </Link>

        <h1 className="text-3xl font-extrabold text-gray-900 mb-8">
          {recipe.title}
        </h1>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Ingredients */}
          <div>
            <h2 className="text-lg font-bold text-gray-900 mb-4">
              Ingredients
            </h2>
            <ul className="list-disc pl-5 space-y-2 text-gray-700 text-sm">
              {recipe.ingredients.map((item, idx) => (
                <li key={idx}>{item}</li>
              ))}
            </ul>
          </div>

          {/* Instructions */}
          <div>
            <h2 className="text-lg font-bold text-gray-900 mb-4">
              Instructions
            </h2>
            <ol className="list-decimal pl-5 space-y-2 text-gray-700 text-sm">
              {recipe.instructions.map((step, idx) => (
                <li key={idx}>{step}</li>
              ))}
            </ol>
          </div>
        </div>
      </div>
    </div>
  );
}

// --- 4. CATEGORIES PAGE (WITH FILTERED RECIPES) ---
function Categories() {
  const { categoryId } = useParams();

  const filteredRecipes = categoryId
    ? recipesData.filter((r) => r.category === categoryId)
    : recipesData;

  return (
    <div className="min-h-[calc(100vh-64px)] bg-[#f8fafc] p-8">
      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-8">
        {/* Sidebar */}
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 h-fit">
          <h2 className="text-lg font-bold text-gray-900 mb-4">Categories</h2>
          <div className="flex flex-col gap-2">
            <Link
              to="/categories"
              className={`px-4 py-2 rounded-xl text-sm font-medium transition-colors ${
                !categoryId
                  ? "bg-red-50 text-[#e11d48]"
                  : "text-gray-600 hover:bg-gray-50"
              }`}
            >
              All Categories
            </Link>
            {categoriesData.map((cat) => (
              <Link
                key={cat.id}
                to={`/categories/${cat.id}`}
                className={`px-4 py-2 rounded-xl text-sm font-medium transition-colors ${
                  categoryId === cat.id
                    ? "bg-red-50 text-[#e11d48]"
                    : "text-gray-600 hover:bg-gray-50"
                }`}
              >
                {cat.name}
              </Link>
            ))}
          </div>
        </div>

        {/* Recipes Display Area */}
        <div className="md:col-span-3">
          <h2 className="text-xl font-bold text-gray-900 mb-6 capitalize">
            {categoryId ? `${categoryId} Recipes` : "Select a Category"}
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {filteredRecipes.map((recipe) => (
              <div
                key={recipe.id}
                className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 flex flex-col justify-between"
              >
                <div>
                  <h3 className="text-lg font-bold text-gray-900 mb-2">
                    {recipe.title}
                  </h3>
                  <p className="text-gray-500 text-sm mb-4">
                    {recipe.description}
                  </p>
                </div>
                <Link
                  to={`/recipes/${recipe.id}`}
                  className="inline-block text-center bg-[#e11d48] hover:bg-[#be123c] text-white font-medium py-2 px-4 rounded-xl text-sm transition-colors"
                >
                  View Details
                </Link>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

// --- 5. 404 NOT FOUND PAGE ---
function NotFound() {
  return (
    <div className="min-h-[calc(100vh-64px)] bg-[#f8fafc] flex flex-col items-center justify-center p-6 text-center">
      <h1 className="text-6xl font-extrabold text-[#e11d48] mb-2">404</h1>
      <h2 className="text-2xl font-bold text-gray-800 mb-2">Page Not Found</h2>
      <p className="text-gray-500 mb-6">
        The page you are looking for does not exist or has been moved.
      </p>
      <Link
        to="/"
        className="bg-[#e11d48] hover:bg-[#be123c] text-white font-semibold py-2.5 px-6 rounded-xl text-sm transition-colors"
      >
        Go Back Home
      </Link>
    </div>
  );
}

// --- MAIN APP COMPONENT ---
export default function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/recipes" element={<RecipeList />} />
        <Route path="/recipes/:id" element={<RecipeDetail />} />
        <Route path="/categories" element={<Categories />} />
        <Route path="/categories/:categoryId" element={<Categories />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Router>
  );
}
n;
