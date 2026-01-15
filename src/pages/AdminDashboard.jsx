import { useState, useEffect } from 'react'
import { useAuth } from '../contexts/AuthContext'
import { supabase } from '../lib/supabaseClient'
import { 
  Users, 
  FileText, 
  Mail, 
  CheckCircle, 
  Clock, 
  XCircle, 
  Eye, 
  Edit,
  Search,
  Filter
} from 'lucide-react'

const statusColors = {
  pending: 'bg-yellow-500/20 text-yellow-400 border-yellow-500',
  under_review: 'bg-blue-500/20 text-blue-400 border-blue-500',
  scheduled: 'bg-green-500/20 text-green-400 border-green-500',
  in_progress: 'bg-orange-500/20 text-orange-400 border-orange-500',
  completed: 'bg-gray-500/20 text-gray-400 border-gray-500',
  cancelled: 'bg-red-500/20 text-red-400 border-red-500',
}

const AdminDashboard = () => {
  const { profile } = useAuth()
  const [applications, setApplications] = useState([])
  const [contactSubmissions, setContactSubmissions] = useState([])
  const [users, setUsers] = useState([])
  const [loading, setLoading] = useState(true)
  const [selectedApplication, setSelectedApplication] = useState(null)
  const [editingStatus, setEditingStatus] = useState(false)
  const [statusFilter, setStatusFilter] = useState('all')
  const [searchTerm, setSearchTerm] = useState('')

  useEffect(() => {
    fetchAllData()
  }, [])

  const fetchAllData = async () => {
    try {
      // Fetch applications
      const { data: apps, error: appsError } = await supabase
        .from('service_applications')
        .select(`
          *,
          services(name, slug),
          profiles(email, full_name, company_name)
        `)
        .order('created_at', { ascending: false })

      if (appsError) throw appsError

      // Fetch contact submissions
      const { data: contacts, error: contactsError } = await supabase
        .from('contact_submissions')
        .select('*')
        .order('created_at', { ascending: false })

      if (contactsError) throw contactsError

      // Fetch users
      const { data: usersData, error: usersError } = await supabase
        .from('profiles')
        .select('*')
        .order('created_at', { ascending: false })

      if (usersError) throw usersError

      setApplications(apps || [])
      setContactSubmissions(contacts || [])
      setUsers(usersData || [])
    } catch (error) {
      console.error('Error fetching data:', error)
    } finally {
      setLoading(false)
    }
  }

  const updateApplicationStatus = async (applicationId, newStatus, statusNotes, assignedTo) => {
    try {
      const { error } = await supabase
        .from('service_applications')
        .update({
          status: newStatus,
          status_notes: statusNotes,
          assigned_to: assignedTo,
          updated_at: new Date().toISOString(),
        })
        .eq('id', applicationId)

      if (error) throw error

      await fetchAllData()
      setSelectedApplication(null)
      setEditingStatus(false)
    } catch (error) {
      console.error('Error updating application:', error)
      alert('Failed to update application status')
    }
  }

  const filteredApplications = applications.filter((app) => {
    const matchesStatus = statusFilter === 'all' || app.status === statusFilter
    const matchesSearch = 
      app.company_name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      app.contact_person?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      app.services?.name?.toLowerCase().includes(searchTerm.toLowerCase())
    return matchesStatus && matchesSearch
  })

  const stats = {
    totalApplications: applications.length,
    pending: applications.filter((a) => a.status === 'pending').length,
    inProgress: applications.filter((a) => a.status === 'in_progress').length,
    completed: applications.filter((a) => a.status === 'completed').length,
    totalUsers: users.length,
    totalContacts: contactSubmissions.length,
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-[#0A0A0A] flex items-center justify-center">
        <div className="text-[#FFEB3B] text-xl">Loading admin dashboard...</div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-[#0A0A0A]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl md:text-4xl font-bold mb-2">
            <span className="text-white">Admin </span>
            <span className="text-[#FFEB3B]">Dashboard</span>
          </h1>
          <p className="text-gray-400">Welcome back, {profile?.full_name || profile?.email}</p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <div className="bg-gray-900 rounded-lg p-6 border border-gray-800">
            <div className="flex items-center justify-between">
              <div>
                <div className="text-gray-400 text-sm mb-1">Total Applications</div>
                <div className="text-3xl font-bold text-[#FFEB3B]">{stats.totalApplications}</div>
              </div>
              <FileText className="w-8 h-8 text-[#FFEB3B]" />
            </div>
          </div>
          <div className="bg-gray-900 rounded-lg p-6 border border-gray-800">
            <div className="flex items-center justify-between">
              <div>
                <div className="text-gray-400 text-sm mb-1">Pending</div>
                <div className="text-3xl font-bold text-yellow-400">{stats.pending}</div>
              </div>
              <Clock className="w-8 h-8 text-yellow-400" />
            </div>
          </div>
          <div className="bg-gray-900 rounded-lg p-6 border border-gray-800">
            <div className="flex items-center justify-between">
              <div>
                <div className="text-gray-400 text-sm mb-1">In Progress</div>
                <div className="text-3xl font-bold text-orange-400">{stats.inProgress}</div>
              </div>
              <Edit className="w-8 h-8 text-orange-400" />
            </div>
          </div>
          <div className="bg-gray-900 rounded-lg p-6 border border-gray-800">
            <div className="flex items-center justify-between">
              <div>
                <div className="text-gray-400 text-sm mb-1">Completed</div>
                <div className="text-3xl font-bold text-green-400">{stats.completed}</div>
              </div>
              <CheckCircle className="w-8 h-8 text-green-400" />
            </div>
          </div>
        </div>

        {/* Applications Section */}
        <div className="bg-gray-900 rounded-lg p-6 border border-gray-800 mb-8">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6">
            <h2 className="text-2xl font-bold text-[#FFEB3B] mb-4 md:mb-0">Service Applications</h2>
            <div className="flex flex-col sm:flex-row gap-4">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search applications..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 pr-4 py-2 bg-[#1A1A1A] border border-gray-700 rounded-md text-white focus:outline-none focus:border-[#FFEB3B]"
                />
              </div>
              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                className="px-4 py-2 bg-[#1A1A1A] border border-gray-700 rounded-md text-white focus:outline-none focus:border-[#FFEB3B]"
              >
                <option value="all">All Status</option>
                <option value="pending">Pending</option>
                <option value="under_review">Under Review</option>
                <option value="scheduled">Scheduled</option>
                <option value="in_progress">In Progress</option>
                <option value="completed">Completed</option>
                <option value="cancelled">Cancelled</option>
              </select>
            </div>
          </div>

          <div className="space-y-4">
            {filteredApplications.length === 0 ? (
              <div className="text-center py-12 text-gray-400">
                No applications found
              </div>
            ) : (
              filteredApplications.map((application) => (
                <div
                  key={application.id}
                  className="bg-[#1A1A1A] rounded-lg p-6 border border-gray-800 hover:border-[#FFEB3B]/50 transition-colors"
                >
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center space-x-4 mb-3">
                        <h3 className="text-xl font-semibold text-white">
                          {application.services?.name || 'Service Application'}
                        </h3>
                        <span
                          className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium border ${statusColors[application.status]}`}
                        >
                          {application.status.replace('_', ' ').toUpperCase()}
                        </span>
                      </div>
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm text-gray-400 mb-3">
                        <div>
                          <span className="text-gray-500">Company:</span> {application.company_name}
                        </div>
                        <div>
                          <span className="text-gray-500">Contact:</span> {application.contact_person}
                        </div>
                        <div>
                          <span className="text-gray-500">User:</span> {application.profiles?.email || 'N/A'}
                        </div>
                        <div>
                          <span className="text-gray-500">Location:</span> {application.location}
                        </div>
                        <div>
                          <span className="text-gray-500">Applied:</span>{' '}
                          {new Date(application.created_at).toLocaleDateString()}
                        </div>
                        {application.assigned_to && (
                          <div>
                            <span className="text-gray-500">Assigned to:</span> {application.assigned_to}
                          </div>
                        )}
                      </div>
                      {application.status_notes && (
                        <div className="mt-3 p-3 bg-gray-900 rounded border border-gray-700">
                          <p className="text-sm text-gray-300">{application.status_notes}</p>
                        </div>
                      )}
                    </div>
                    <button
                      onClick={() => setSelectedApplication(application)}
                      className="ml-4 px-4 py-2 border border-gray-700 text-gray-300 rounded-md hover:border-[#FFEB3B] hover:text-[#FFEB3B] transition-colors flex items-center"
                    >
                      <Eye className="w-4 h-4 mr-2" />
                      View/Edit
                    </button>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>

        {/* Contact Submissions */}
        <div className="bg-gray-900 rounded-lg p-6 border border-gray-800">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold text-[#FFEB3B]">Contact Submissions ({contactSubmissions.length})</h2>
          </div>
          <div className="space-y-4">
            {contactSubmissions.slice(0, 5).map((contact) => (
              <div key={contact.id} className="bg-[#1A1A1A] rounded-lg p-4 border border-gray-800">
                <div className="flex items-start justify-between mb-2">
                  <div>
                    <div className="text-white font-semibold">{contact.full_name}</div>
                    <div className="text-gray-400 text-sm">{contact.email} • {contact.phone}</div>
                  </div>
                  <div className="text-gray-500 text-xs">
                    {new Date(contact.created_at).toLocaleDateString()}
                  </div>
                </div>
                {contact.company_name && (
                  <div className="text-gray-400 text-sm mb-2">Company: {contact.company_name}</div>
                )}
                <div className="text-gray-300 text-sm">{contact.message}</div>
              </div>
            ))}
            {contactSubmissions.length === 0 && (
              <div className="text-center py-8 text-gray-400">No contact submissions</div>
            )}
          </div>
        </div>
      </div>

      {/* Application Details/Edit Modal */}
      {selectedApplication && (
        <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50 p-4">
          <div className="bg-gray-900 rounded-lg max-w-3xl w-full max-h-[90vh] overflow-y-auto border border-gray-800">
            <div className="p-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold text-[#FFEB3B]">Application Details</h2>
                <button
                  onClick={() => {
                    setSelectedApplication(null)
                    setEditingStatus(false)
                  }}
                  className="text-gray-400 hover:text-white"
                >
                  <XCircle className="w-6 h-6" />
                </button>
              </div>

              {!editingStatus ? (
                <>
                  <div className="space-y-4 mb-6">
                    <div>
                      <h3 className="text-white font-semibold mb-2">Service</h3>
                      <p className="text-gray-400">{selectedApplication.services?.name}</p>
                    </div>
                    <div>
                      <h3 className="text-white font-semibold mb-2">Status</h3>
                      <span
                        className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium border ${statusColors[selectedApplication.status]}`}
                      >
                        {selectedApplication.status.replace('_', ' ').toUpperCase()}
                      </span>
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <h3 className="text-white font-semibold mb-2">Company</h3>
                        <p className="text-gray-400">{selectedApplication.company_name}</p>
                      </div>
                      <div>
                        <h3 className="text-white font-semibold mb-2">Contact Person</h3>
                        <p className="text-gray-400">{selectedApplication.contact_person}</p>
                      </div>
                      <div>
                        <h3 className="text-white font-semibold mb-2">Phone</h3>
                        <p className="text-gray-400">{selectedApplication.phone}</p>
                      </div>
                      <div>
                        <h3 className="text-white font-semibold mb-2">Location</h3>
                        <p className="text-gray-400">{selectedApplication.location}</p>
                      </div>
                      {selectedApplication.preferred_date && (
                        <div>
                          <h3 className="text-white font-semibold mb-2">Preferred Date</h3>
                          <p className="text-gray-400">
                            {new Date(selectedApplication.preferred_date).toLocaleDateString()}
                          </p>
                        </div>
                      )}
                      {selectedApplication.current_energy_source && (
                        <div>
                          <h3 className="text-white font-semibold mb-2">Current Energy Source</h3>
                          <p className="text-gray-400">{selectedApplication.current_energy_source}</p>
                        </div>
                      )}
                    </div>
                    {selectedApplication.additional_notes && (
                      <div>
                        <h3 className="text-white font-semibold mb-2">Additional Notes</h3>
                        <p className="text-gray-400">{selectedApplication.additional_notes}</p>
                      </div>
                    )}
                    {selectedApplication.assigned_to && (
                      <div>
                        <h3 className="text-white font-semibold mb-2">Assigned To</h3>
                        <p className="text-gray-400">{selectedApplication.assigned_to}</p>
                      </div>
                    )}
                    {selectedApplication.status_notes && (
                      <div>
                        <h3 className="text-white font-semibold mb-2">Status Notes</h3>
                        <p className="text-gray-300 bg-gray-800 p-3 rounded">{selectedApplication.status_notes}</p>
                      </div>
                    )}
                  </div>
                  <button
                    onClick={() => setEditingStatus(true)}
                    className="w-full px-6 py-3 bg-[#FFEB3B] text-black font-semibold rounded-md hover:bg-[#FFEB3B]/90 transition-colors"
                  >
                    Update Status
                  </button>
                </>
              ) : (
                <ApplicationStatusForm
                  application={selectedApplication}
                  onSave={(status, notes, assigned) => {
                    updateApplicationStatus(selectedApplication.id, status, notes, assigned)
                  }}
                  onCancel={() => setEditingStatus(false)}
                />
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

const ApplicationStatusForm = ({ application, onSave, onCancel }) => {
  const [status, setStatus] = useState(application.status)
  const [statusNotes, setStatusNotes] = useState(application.status_notes || '')
  const [assignedTo, setAssignedTo] = useState(application.assigned_to || '')

  const handleSubmit = (e) => {
    e.preventDefault()
    onSave(status, statusNotes, assignedTo)
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div>
        <label className="block text-gray-300 mb-2">Status</label>
        <select
          value={status}
          onChange={(e) => setStatus(e.target.value)}
          className="w-full px-4 py-2 bg-[#1A1A1A] border border-gray-700 rounded-md text-white focus:outline-none focus:border-[#FFEB3B]"
        >
          <option value="pending">Pending</option>
          <option value="under_review">Under Review</option>
          <option value="scheduled">Scheduled</option>
          <option value="in_progress">In Progress</option>
          <option value="completed">Completed</option>
          <option value="cancelled">Cancelled</option>
        </select>
      </div>
      <div>
        <label className="block text-gray-300 mb-2">Assigned To</label>
        <input
          type="text"
          value={assignedTo}
          onChange={(e) => setAssignedTo(e.target.value)}
          placeholder="Enter consultant name"
          className="w-full px-4 py-2 bg-[#1A1A1A] border border-gray-700 rounded-md text-white focus:outline-none focus:border-[#FFEB3B]"
        />
      </div>
      <div>
        <label className="block text-gray-300 mb-2">Status Notes</label>
        <textarea
          value={statusNotes}
          onChange={(e) => setStatusNotes(e.target.value)}
          rows="4"
          placeholder="Add notes about this application..."
          className="w-full px-4 py-2 bg-[#1A1A1A] border border-gray-700 rounded-md text-white focus:outline-none focus:border-[#FFEB3B]"
        />
      </div>
      <div className="flex space-x-4">
        <button
          type="button"
          onClick={onCancel}
          className="flex-1 px-6 py-3 border border-gray-700 text-gray-300 rounded-md hover:border-[#FFEB3B] hover:text-[#FFEB3B] transition-colors"
        >
          Cancel
        </button>
        <button
          type="submit"
          className="flex-1 px-6 py-3 bg-[#FFEB3B] text-black font-semibold rounded-md hover:bg-[#FFEB3B]/90 transition-colors"
        >
          Save Changes
        </button>
      </div>
    </form>
  )
}

export default AdminDashboard
