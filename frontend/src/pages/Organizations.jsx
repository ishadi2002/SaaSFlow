import { useEffect, useState } from "react";
import {
  Building2,
  Plus,
  Pencil,
  Trash2,
  X,
  Save,
  LoaderCircle,
} from "lucide-react";

import api from "../api/axios";

const Organizations = () => {
  const [organizations, setOrganizations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");

  const [showModal, setShowModal] = useState(false);
  const [editingOrganization, setEditingOrganization] = useState(null);

  const [formData, setFormData] = useState({
    name: "",
    industry: "",
  });

  // ================================
  // GET ORGANIZATIONS
  // ================================
  const fetchOrganizations = async () => {
    try {
      setLoading(true);
      setError("");

      const response = await api.get("/organizations");

      setOrganizations(response.data);
    } catch (err) {
      console.error("Fetch organizations error:", err);

      setError(
        err.response?.data?.message ||
          "Unable to load organizations."
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchOrganizations();
  }, []);

  // ================================
  // OPEN CREATE MODAL
  // ================================
  const openCreateModal = () => {
    setEditingOrganization(null);

    setFormData({
      name: "",
      industry: "",
    });

    setError("");
    setShowModal(true);
  };

  // ================================
  // OPEN EDIT MODAL
  // ================================
  const openEditModal = (organization) => {
    setEditingOrganization(organization);

    setFormData({
      name: organization.name || "",
      industry: organization.industry || "",
    });

    setError("");
    setShowModal(true);
  };

  // ================================
  // CLOSE MODAL
  // ================================
  const closeModal = () => {
    if (saving) {
      return;
    }

    setShowModal(false);
    setEditingOrganization(null);

    setFormData({
      name: "",
      industry: "",
    });

    setError("");
  };

  // ================================
  // FORM INPUT CHANGE
  // ================================
  const handleChange = (event) => {
    const { name, value } = event.target;

    setFormData((current) => ({
      ...current,
      [name]: value,
    }));
  };

  // ================================
  // CREATE / UPDATE ORGANIZATION
  // ================================
  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!formData.name.trim()) {
      setError("Organization name is required.");
      return;
    }

    try {
      setSaving(true);
      setError("");

      const payload = {
        name: formData.name.trim(),
        industry: formData.industry.trim(),
      };

      if (editingOrganization) {
        await api.put(
          `/organizations/${editingOrganization.id}`,
          payload
        );
      } else {
        await api.post("/organizations", payload);
      }

      setShowModal(false);
      setEditingOrganization(null);

      setFormData({
        name: "",
        industry: "",
      });

      await fetchOrganizations();
    } catch (err) {
      console.error("Save organization error:", err);

      if (err.response?.data?.errors) {
        const messages = Object.values(
          err.response.data.errors
        );

        setError(messages.join(" • "));
      } else {
        setError(
          err.response?.data?.message ||
            "Unable to save organization."
        );
      }
    } finally {
      setSaving(false);
    }
  };

  // ================================
  // DELETE ORGANIZATION
  // ================================
  const handleDelete = async (organization) => {
    const confirmed = window.confirm(
      `Are you sure you want to delete "${organization.name}"?`
    );

    if (!confirmed) {
      return;
    }

    try {
      setError("");

      await api.delete(
        `/organizations/${organization.id}`
      );

      setOrganizations((currentOrganizations) =>
        currentOrganizations.filter(
          (item) => item.id !== organization.id
        )
      );
    } catch (err) {
      console.error("Delete organization error:", err);

      setError(
        err.response?.data?.message ||
          "Unable to delete organization."
      );
    }
  };

  // ================================
  // FORMAT DATE
  // ================================
  const formatDate = (date) => {
    if (!date) {
      return "—";
    }

    return new Date(date).toLocaleDateString();
  };

  return (
    <div className="organizations-page">

      {/* PAGE HEADER */}
      <div className="organizations-header">
        <div>
          <span className="page-eyebrow">
            Workspace management
          </span>

          <h1>Organizations</h1>

          <p>
            Create and manage the organizations connected
            to your SaaSFlow account.
          </p>
        </div>

        <button
          type="button"
          className="dashboard-primary-action"
          onClick={openCreateModal}
        >
          <Plus size={18} />

          New organization
        </button>
      </div>

      {/* ERROR */}
      {error && !showModal && (
        <div className="organizations-error">
          {error}
        </div>
      )}

      {/* MAIN PANEL */}
      <div className="organizations-panel">

        <div className="organizations-panel-header">
          <div>
            <h3>Your organizations</h3>

            <p>
              {organizations.length}{" "}
              {organizations.length === 1
                ? "organization"
                : "organizations"}{" "}
              found
            </p>
          </div>
        </div>

        {/* LOADING */}
        {loading && (
          <div className="organizations-state">
            <LoaderCircle
              className="spin-icon"
              size={30}
            />

            <p>Loading organizations...</p>
          </div>
        )}

        {/* EMPTY STATE */}
        {!loading && organizations.length === 0 && (
          <div className="organizations-empty">

            <div className="empty-icon">
              <Building2 size={28} />
            </div>

            <h3>No organizations yet</h3>

            <p>
              Create your first organization to start
              managing your workspace.
            </p>

            <button
              type="button"
              className="empty-create-button"
              onClick={openCreateModal}
            >
              <Plus size={17} />

              Create organization
            </button>

          </div>
        )}

        {/* ORGANIZATION CARDS */}
        {!loading && organizations.length > 0 && (
          <div className="organizations-grid">

            {organizations.map((organization) => (
              <article
                className="organization-card"
                key={organization.id}
              >

                <div className="organization-card-top">

                  <div className="organization-icon">
                    <Building2 size={22} />
                  </div>

                  <span className="organization-id">
                    #{organization.id}
                  </span>

                </div>

                <div className="organization-card-content">

                  <h3>
                    {organization.name}
                  </h3>

                  <span className="industry-badge">
                    {organization.industry || "General"}
                  </span>

                  <div className="organization-meta">

                    <div>
                      <span>Owner ID</span>

                      <strong>
                        {organization.ownerId ?? "—"}
                      </strong>
                    </div>

                    <div>
                      <span>Created</span>

                      <strong>
                        {formatDate(
                          organization.createdAt
                        )}
                      </strong>
                    </div>

                  </div>

                </div>

                <div className="organization-card-actions">

                  <button
                    type="button"
                    className="organization-edit-button"
                    onClick={() =>
                      openEditModal(organization)
                    }
                  >
                    <Pencil size={16} />

                    Edit
                  </button>

                  <button
                    type="button"
                    className="organization-delete-button"
                    onClick={() =>
                      handleDelete(organization)
                    }
                  >
                    <Trash2 size={16} />

                    Delete
                  </button>

                </div>

              </article>
            ))}

          </div>
        )}

      </div>

      {/* CREATE / EDIT MODAL */}
      {showModal && (
        <div
          className="modal-backdrop"
          onMouseDown={(event) => {
            if (event.target === event.currentTarget) {
              closeModal();
            }
          }}
        >

          <div className="organization-modal">

            <div className="modal-header">

              <div>
                <span className="page-eyebrow">
                  {editingOrganization
                    ? "Update workspace"
                    : "New workspace"}
                </span>

                <h2>
                  {editingOrganization
                    ? "Edit organization"
                    : "Create organization"}
                </h2>
              </div>

              <button
                type="button"
                className="modal-close-button"
                onClick={closeModal}
                disabled={saving}
                aria-label="Close"
              >
                <X size={20} />
              </button>

            </div>

            {/* MODAL ERROR */}
            {error && (
              <div className="organizations-error modal-error">
                {error}
              </div>
            )}

            {/* FORM */}
            <form
              className="organization-form"
              onSubmit={handleSubmit}
            >

              <div className="form-group">

                <label htmlFor="organization-name">
                  Organization name
                </label>

                <input
                  id="organization-name"
                  name="name"
                  type="text"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="e.g. SaaSFlow Technologies"
                  autoComplete="organization"
                  required
                />

              </div>

              <div className="form-group">

                <label htmlFor="organization-industry">
                  Industry
                </label>

                <input
                  id="organization-industry"
                  name="industry"
                  type="text"
                  value={formData.industry}
                  onChange={handleChange}
                  placeholder="e.g. Software Development"
                />

              </div>

              <div className="modal-actions">

                <button
                  type="button"
                  className="modal-cancel-button"
                  onClick={closeModal}
                  disabled={saving}
                >
                  Cancel
                </button>

                <button
                  type="submit"
                  className="modal-save-button"
                  disabled={saving}
                >

                  {saving ? (
                    <>
                      <LoaderCircle
                        className="spin-icon"
                        size={17}
                      />

                      Saving...
                    </>
                  ) : (
                    <>
                      <Save size={17} />

                      {editingOrganization
                        ? "Save changes"
                        : "Create organization"}
                    </>
                  )}

                </button>

              </div>

            </form>

          </div>
        </div>
      )}

    </div>
  );
};

export default Organizations;