import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { useAuth } from '../contexts/AuthContext'
import { supabase } from '../lib/supabaseClient'
import { Plus, Eye, Calendar, CheckCircle, Clock, XCircle, AlertCircle } from 'lucide-react'

const statusColors = {
  pending: 'bg-yellow-500/20 text-yellow-400 border-yellow-500',
  under_review: 'bg-blue-500/20 text-blue-400 border-blue-500',
  scheduled: 'bg-green-500/20 text-green-400 border-green-500',
  in_progress: 'bg-orange-500/20 text-orange-400 border-orange-500',
  completed: 'bg-gray-500/20 text-gray-400 border-gray-500',
  cancelled: 'bg-red-500/20 text-red-400 border-red-500',
}

const statusIcons = {
  pending: Clock,
  under_review: Eye,
  scheduled: Calendar,
  in_progress: AlertCircle,
  completed: CheckCircle,
  cancelled: XCircle,
}

const Dashboard = () => {
  const { user, profile } = useAuth()
  const [applications, setApplications] = useState([])
  const [loading, setLoading] = useState(true)
  const [selectedApplication, setSelectedApplication] = useState(null)

  useEffect(() => {
    if (user) {
      fetchApplications()
    }
  }, [user])

  const fetchApplications = async () => {
    try {
      const { data, error } = await supabase
        .from('service_applications')
        .select(`
          *,
          services(name, slug, description)
        `)
        .eq('user_id', user.id)
        .order('created_at', { ascending: false })

      if (error) throw error
      setApplications(data || [])
    } catch (error) {
      console.error('Error fetching applications:', error)
    } finally {
      setLoading(false)
    }
  }

  const getStats = () => {
    const total = applications.length
    const pending = applications.filter((app) => app.status === 'pending').length
    const scheduled = applications.filter((app) => app.status === 'scheduled').length
    return { total, pending, scheduled }
  }

  const stats = getStats()

  if (loading) {
    return (
      <div className="min-h-screen bg-[#0A0A0A] flex items-center justify-center">
        <div className="text-[#FFEB3B] text-xl">Loading dashboard...</div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-[#0A0A0A]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Welcome Header */}
        <div className="mb-8">
          <h1 className="text-3xl md:text-4xl font-bold mb-2">
            <span className="text-white">Welcome back, </span>
            <span className="text-[#FFEB3B]">{profile?.full_name || user?.email}</span>
          </h1>
          <p className="text-gray-400">Manage your service applications and track their status</p>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-gray-900 rounded-lg p-6 border border-gray-800">
            <div className="text-gray-400 text-sm mb-1">Total Applications</div>
            <div className="text-3xl font-bold text-[#FFEB3B]">{stats.total}</div>
          </div>
          <div className="bg-gray-900 rounded-lg p-6 border border-gray-800">
            <div className="text-gray-400 text-sm mb-1">Pending Reviews</div>
            <div className="text-3xl font-bold text-yellow-400">{stats.pending}</div>
          </div>
          <div className="bg-gray-900 rounded-lg p-6 border border-gray-800">
            <div className="text-gray-400 text-sm mb-1">Scheduled</div>
            <div className="text-3xl font-bold text-green-400">{stats.scheduled}</div>
          </div>
        </div>

        {/* Applications Section */}
        <div className="bg-gray-900 rounded-lg p-6 border border-gray-800">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold text-[#FFEB3B]">My Applications</h2>
            <Link
              to="/services"
              className="inline-flex items-center px-4 py-2 bg-[#FFEB3B] text-black font-semibold rounded-md hover:bg-[#FFEB3B]/90 transition-colors"
            >
              <Plus className="w-4 h-4 mr-2" />
              Apply for New Service
            </Link>
          </div>

          {applications.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-gray-400 mb-4">You haven't submitted any applications yet.</p>
              <Link
                to="/services"
                className="inline-flex items-center px-6 py-3 bg-[#FFEB3B] text-black font-semibold rounded-md hover:bg-[#FFEB3B]/90 transition-colors"
              >
                Browse Services <Plus className="w-4 h-4 ml-2" />
              </Link>
            </div>
          ) : (
            <div className="space-y-4">
              {applications.map((application) => {
                const StatusIcon = statusIcons[application.status] || Clock
                return (
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
                            <StatusIcon className="w-3 h-3 mr-1" />
                            {application.status.replace('_', ' ').toUpperCase()}
                          </span>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm text-gray-400 mb-4">
                          <div>
                            <span className="text-gray-500">Company:</span> {application.company_name}
                          </div>
                          <div>
                            <span className="text-gray-500">Location:</span> {application.location}
                          </div>
                          <div>
                            <span className="text-gray-500">Applied:</span>{' '}
                            {new Date(application.created_at).toLocaleDateString()}
                          </div>
                          {application.preferred_date && (
                            <div>
                              <span className="text-gray-500">Preferred Date:</span>{' '}
                              {new Date(application.preferred_date).toLocaleDateString()}
                            </div>
                          )}
                        </div>
                        {application.status_notes && (
                          <div className="mt-3 p-3 bg-gray-900 rounded border border-gray-700">
                            <p className="text-sm text-gray-300">
                              <span className="font-semibold text-[#FFEB3B]">Status Update:</span>{' '}
                              {application.status_notes}
                            </p>
                          </div>
                        )}
                      </div>
                      <button
                        onClick={() => setSelectedApplication(application)}
                        className="ml-4 px-4 py-2 border border-gray-700 text-gray-300 rounded-md hover:border-[#FFEB3B] hover:text-[#FFEB3B] transition-colors flex items-center"
                      >
                        <Eye className="w-4 h-4 mr-2" />
                        View Details
                      </button>
                    </div>
                  </div>
                )
              })}
            </div>
          )}
        </div>
      </div>

      {/* Application Details Modal */}
      {selectedApplication && (
        <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50 p-4">
          <div className="bg-gray-900 rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto border border-gray-800">
            <div className="p-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold text-[#FFEB3B]">Application Details</h2>
                <button
                  onClick={() => setSelectedApplication(null)}
                  className="text-gray-400 hover:text-white"
                >
                  <XCircle className="w-6 h-6" />
                </button>
              </div>

              <div className="space-y-4">
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

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <h3 className="text-white font-semibold mb-2">Company Name</h3>
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
                  {selectedApplication.estimated_load && (
                    <div>
                      <h3 className="text-white font-semibold mb-2">Estimated Load</h3>
                      <p className="text-gray-400">{selectedApplication.estimated_load}</p>
                    </div>
                  )}
                </div>

                {selectedApplication.additional_notes && (
                  <div>
                    <h3 className="text-white font-semibold mb-2">Additional Notes</h3>
                    <p className="text-gray-400">{selectedApplication.additional_notes}</p>
                  </div>
                )}

                {selectedApplication.status_notes && (
                  <div className="p-4 bg-gray-800 rounded border border-gray-700">
                    <h3 className="text-[#FFEB3B] font-semibold mb-2">Status Notes</h3>
                    <p className="text-gray-300">{selectedApplication.status_notes}</p>
                  </div>
                )}

                {selectedApplication.assigned_to && (
                  <div>
                    <h3 className="text-white font-semibold mb-2">Assigned Consultant</h3>
                    <p className="text-gray-400">{selectedApplication.assigned_to}</p>
                  </div>
                )}

                <div className="pt-4 border-t border-gray-800">
                  <p className="text-sm text-gray-500">
                    Application submitted on {new Date(selectedApplication.created_at).toLocaleString()}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default Dashboard
