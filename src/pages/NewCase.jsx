import { useState } from "react";
import { useCases } from "../context/CaseContext";
import { useNavigate } from "react-router-dom";
import { users } from "../data/mockData";  

export default function NewCase() {
  const { addCase } = useCases();
  const navigate = useNavigate();

  const [form, setForm] = useState({
    id: "",
    title: "",
    description: "",
    status: "Active",
    nextHearing: "",
    assignedJudgeId: "",
    assignedLawyerId: "",
    clientId: "",
    documents: []
  });

  function handleChange(e) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  function handleSubmit(e) {
    e.preventDefault();

    if (!form.id || !form.title) {
      alert("Case ID and Title are required!");
      return;
    }

    addCase(form);
    alert("Case created successfully!");
    navigate("/cases");
  }

  return (
    <div className="p-6 max-w-xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">Create New Case</h1>

      <form className="space-y-4" onSubmit={handleSubmit}>

        {/* Case ID */}
        <input
          name="id"
          placeholder="Case ID"
          onChange={handleChange}
          className="border p-2 w-full rounded"
          required
        />

        {/* Case Title */}
        <input
          name="title"
          placeholder="Case Title"
          onChange={handleChange}
          className="border p-2 w-full rounded"
          required
        />

        {/* Description */}
        <textarea
          name="description"
          placeholder="Description"
          onChange={handleChange}
          className="border p-2 w-full rounded"
        />

        {/* Hearing Date */}
        <input
          type="date"
          name="nextHearing"
          onChange={handleChange}
          className="border p-2 w-full rounded"
        />

        {/* Status */}
        <select
          name="status"
          onChange={handleChange}
          className="border p-2 w-full rounded"
        >
          <option>Active</option>
          <option>Pending</option>
          <option>Closed</option>
        </select>

        {/* Judge Dropdown */}
        <select
          name="assignedJudgeId"
          onChange={handleChange}
          className="border p-2 w-full rounded"
        >
          <option value="">Select Judge</option>
          {users
            .filter(u => u.role === "Judge")
            .map(j => (
              <option key={j.id} value={j.id}>{j.name}</option>
            ))}
        </select>

        {/* Lawyer Dropdown */}
        <select
          name="assignedLawyerId"
          onChange={handleChange}
          className="border p-2 w-full rounded"
        >
          <option value="">Select Lawyer</option>
          {users
            .filter(u => u.role === "Lawyer")
            .map(l => (
              <option key={l.id} value={l.id}>{l.name}</option>
            ))}
        </select>

        {/* Client Dropdown */}
        <select
          name="clientId"
          onChange={handleChange}
          className="border p-2 w-full rounded"
        >
          <option value="">Select Client</option>
          {users
            .filter(u => u.role === "Person")
            .map(c => (
              <option key={c.id} value={c.id}>{c.name}</option>
            ))}
        </select>

        {/* Submit */}
        <button className="bg-purple-600 text-white px-4 py-2 rounded w-full">
          Add Case
        </button>

      </form>
    </div>
  );
}
