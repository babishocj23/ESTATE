import React, { useState, useEffect } from 'react';
import { FiLoader, FiAlertCircle, FiStar, FiMessageSquare, FiFlag } from 'react-icons/fi';
import { useAuth } from '../../contexts/AuthContext';
import { supabase } from '../../lib/supabase';

const Reviews = () => {
  const { user } = useAuth();
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [respondingTo, setRespondingTo] = useState(null);
  const [response, setResponse] = useState('');

  useEffect(() => {
    fetchReviews();
  }, [user]);

  const fetchReviews = async () => {
    try {
      setLoading(true);
      const { data, error } = await supabase
        .from('agent_reviews')
        .select(`
          *,
          reviewer:reviewer_id(
            full_name,
            email
          )
        `)
        .eq('agent_id', user?.id)
        .order('created_at', { ascending: false });

      if (error) throw error;
      setReviews(data || []);
    } catch (err) {
      console.error('Error fetching reviews:', err);
      setError('Failed to load reviews');
    } finally {
      setLoading(false);
    }
  };

  const handleRespond = async (reviewId) => {
    try {
      const { error } = await supabase
        .from('agent_reviews')
        .update({
          response,
          updated_at: new Date().toISOString()
        })
        .eq('id', reviewId);

      if (error) throw error;

      setReviews(reviews.map(review =>
        review.id === reviewId ? { ...review, response } : review
      ));
      setRespondingTo(null);
      setResponse('');
    } catch (err) {
      console.error('Error responding to review:', err);
      alert('Failed to submit response');
    }
  };

  const handleReport = async (reviewId) => {
    if (!window.confirm('Are you sure you want to report this review?')) return;

    try {
      const { error } = await supabase
        .from('agent_reviews')
        .update({
          status: 'reported',
          updated_at: new Date().toISOString()
        })
        .eq('id', reviewId);

      if (error) throw error;

      setReviews(reviews.map(review =>
        review.id === reviewId ? { ...review, status: 'reported' } : review
      ));
    } catch (err) {
      console.error('Error reporting review:', err);
      alert('Failed to report review');
    }
  };

  const renderStars = (rating) => {
    return [...Array(5)].map((_, index) => (
      <FiStar
        key={index}
        className={`w-4 h-4 ${
          index < rating ? 'text-yellow-500 fill-current' : 'text-gray-400'
        }`}
      />
    ));
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <FiLoader className="w-8 h-8 text-primary animate-spin" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex flex-col items-center justify-center h-64">
        <FiAlertCircle className="w-12 h-12 text-red-500 mb-4" />
        <p className="text-gray-400">{error}</p>
      </div>
    );
  }

  return (
    <div>
      <h2 className="text-2xl font-bold text-white mb-6">
        Reviews & Ratings<span className="text-primary">.</span>
      </h2>

      {reviews.length === 0 ? (
        <div className="text-center py-12 bg-dark-700 rounded-lg">
          <p className="text-gray-400">No reviews yet</p>
        </div>
      ) : (
        <div className="space-y-6">
          {reviews.map((review) => (
            <div
              key={review.id}
              className="bg-dark-700 rounded-lg p-6 space-y-4"
            >
              <div className="flex items-start justify-between">
                <div>
                  <div className="flex items-center gap-2 mb-2">
                    {renderStars(review.rating)}
                    <span className="text-gray-400 text-sm">
                      {new Date(review.created_at).toLocaleDateString()}
                    </span>
                  </div>
                  <p className="font-medium text-white">
                    {review.reviewer?.full_name || 'Anonymous'}
                  </p>
                </div>
                {review.status !== 'reported' && (
                  <button
                    onClick={() => handleReport(review.id)}
                    className="p-2 text-gray-400 hover:text-red-500 transition-colors"
                    title="Report inappropriate review"
                  >
                    <FiFlag className="w-4 h-4" />
                  </button>
                )}
              </div>

              <p className="text-gray-300">{review.comment}</p>

              {review.response && (
                <div className="bg-dark-600 rounded-lg p-4 mt-4">
                  <p className="text-sm text-gray-400 mb-2">Your response:</p>
                  <p className="text-gray-300">{review.response}</p>
                </div>
              )}

              {!review.response && respondingTo !== review.id && (
                <button
                  onClick={() => setRespondingTo(review.id)}
                  className="flex items-center gap-2 text-primary hover:text-primary-dark transition-colors"
                >
                  <FiMessageSquare className="w-4 h-4" />
                  Respond to review
                </button>
              )}

              {respondingTo === review.id && (
                <div className="space-y-4">
                  <textarea
                    value={response}
                    onChange={(e) => setResponse(e.target.value)}
                    placeholder="Write your response..."
                    className="w-full bg-dark-600 border border-dark-500 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-primary h-32 resize-none"
                  />
                  <div className="flex justify-end gap-4">
                    <button
                      onClick={() => {
                        setRespondingTo(null);
                        setResponse('');
                      }}
                      className="px-4 py-2 text-gray-400 hover:text-white transition-colors"
                    >
                      Cancel
                    </button>
                    <button
                      onClick={() => handleRespond(review.id)}
                      disabled={!response.trim()}
                      className="px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary-dark transition-colors disabled:opacity-50"
                    >
                      Submit Response
                    </button>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Reviews; 