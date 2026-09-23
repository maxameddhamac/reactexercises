import { useState } from "react";

export default function ContactApp() {
  const [contacts, setContacts] = useState([
    {
      id: 1,
      name: "Mohamud",
      email: "mc@email.com",
      phone: "0890798798",
      isFavorite: false,
    },
  ]);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
  });

  const [editId, setEditId] = useState(null);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.name.trim()) return;

    if (editId !== null) {
      // Edit contact
      setContacts(
        contacts.map((contact) =>
          contact.id === editId ? { ...contact, ...formData } : contact,
        ),
      );
      setEditId(null);
    } else {
      // Add new contact
      const newContact = {
        id: Date.now(),
        ...formData,
        isFavorite: false,
      };
      setContacts([...contacts, newContact]);
    }

    setFormData({ name: "", email: "", phone: "" });
  };

  const handleEdit = (contact) => {
    setEditId(contact.id);
    setFormData({
      name: contact.name,
      email: contact.email,
      phone: contact.phone,
    });
  };

  const handleDelete = (id) => {
    setContacts(contacts.filter((contact) => contact.id !== id));
  };

  const handleToggleFavorite = (id) => {
    setContacts(
      contacts.map((contact) =>
        contact.id === id
          ? { ...contact, isFavorite: !contact.isFavorite }
          : contact,
      ),
    );
  };

  return (
    <div className="p-8 font-serif">
      <h1 className="text-3xl font-bold mb-6">Contact Management App</h1>

      {/* Form Section */}
      <div className="mb-8">
        <h2 className="text-2xl font-bold mb-4">
          {editId !== null ? "Edit Contact" : "Add New Contact"}
        </h2>
        <form onSubmit={handleSubmit} className="space-y-2 max-w-xs">
          <div className="flex items-center gap-2">
            <label className="w-16 text-lg">Name:</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className="border border-black px-1 py-0.5 outline-none flex-1 text-base"
              required
            />
          </div>

          <div className="flex items-center gap-2">
            <label className="w-16 text-lg">Email:</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="border border-black px-1 py-0.5 outline-none flex-1 text-base"
            />
          </div>

          <div className="flex items-center gap-2">
            <label className="w-16 text-lg">Phone:</label>
            <input
              type="text"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              className="border border-black px-1 py-0.5 outline-none flex-1 text-base"
            />
          </div>

          <button
            type="submit"
            className="border border-black px-3 py-0.5 mt-2 bg-gray-100 hover:bg-gray-200 text-base"
          >
            {editId !== null ? "Update" : "Add"}
          </button>
        </form>
      </div>

      {/* Contacts List Section */}
      <div>
        <h2 className="text-2xl font-bold mb-4">Contacts</h2>
        <ul className="list-disc pl-5 space-y-6">
          {contacts.map((contact) => (
            <li key={contact.id} className="space-y-2">
              <span className="font-bold text-xl">
                {contact.name} {contact.isFavorite && "⭐"}
              </span>
              <p className="text-lg">Email: {contact.email}</p>
              <p className="text-lg">Phone: {contact.phone}</p>

              <div className="flex gap-1 pt-1">
                <button
                  onClick={() => handleToggleFavorite(contact.id)}
                  className="border border-black px-2 py-0.5 bg-gray-100 hover:bg-gray-200 text-base"
                >
                  Favorite
                </button>
                <button
                  onClick={() => handleEdit(contact)}
                  className="border border-black px-2 py-0.5 bg-gray-100 hover:bg-gray-200 text-base"
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDelete(contact.id)}
                  className="border border-black px-2 py-0.5 bg-gray-100 hover:bg-gray-200 text-base"
                >
                  Delete
                </button>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
