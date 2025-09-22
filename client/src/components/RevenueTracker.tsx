import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  DollarSign, 
  CreditCard, 
  TrendingUp, 
  TrendingDown,
  ArrowUpRight,
  ArrowDownLeft,
  Calendar,
  Download,
  Filter,
  Search,
  CheckCircle,
  Clock,
  AlertCircle
} from 'lucide-react';

interface Transaction {
  id: string;
  type: 'incoming' | 'outgoing';
  amount: number;
  description: string;
  date: Date;
  status: 'completed' | 'pending' | 'failed';
  source: string;
  reference: string;
}

export function RevenueTracker() {
  const [isStripeConnected, setIsStripeConnected] = useState(false);
  const [transactions] = useState<Transaction[]>([
    {
      id: '1',
      type: 'incoming',
      amount: 2499.00,
      description: 'Formation "Secrets pour 10K€/mois" - Vente',
      date: new Date('2024-02-20T14:30:00'),
      status: 'completed',
      source: 'Stripe',
      reference: 'pi_3OkJ2KL...'
    },
    {
      id: '2',
      type: 'incoming',
      amount: 997.00,
      description: 'Coaching 1-to-1 - Session Mars',
      date: new Date('2024-02-19T10:15:00'),
      status: 'completed',
      source: 'Stripe',
      reference: 'pi_3OkH8ML...'
    },
    {
      id: '3',
      type: 'incoming',
      amount: 149.00,
      description: 'Ebook "Mindset Entrepreneur" - Vente',
      date: new Date('2024-02-18T16:45:00'),
      status: 'completed',
      source: 'Stripe',
      reference: 'pi_3OkG5NL...'
    },
    {
      id: '4',
      type: 'outgoing',
      amount: 89.00,
      description: 'Frais Stripe - Commission',
      date: new Date('2024-02-18T16:46:00'),
      status: 'completed',
      source: 'Stripe',
      reference: 'fee_3OkG5NL...'
    },
    {
      id: '5',
      type: 'incoming',
      amount: 1299.00,
      description: 'Masterclass "Business en ligne" - Vente',
      date: new Date('2024-02-17T09:20:00'),
      status: 'pending',
      source: 'Stripe',
      reference: 'pi_3OkF2JL...'
    },
    {
      id: '6',
      type: 'incoming',
      amount: 497.00,
      description: 'Consultation stratégie - Février',
      date: new Date('2024-02-16T11:30:00'),
      status: 'completed',
      source: 'Stripe',
      reference: 'pi_3OkE9KL...'
    },
    {
      id: '7',
      type: 'outgoing',
      amount: 299.00,
      description: 'Remboursement client - Formation',
      date: new Date('2024-02-15T14:20:00'),
      status: 'completed',
      source: 'Stripe',
      reference: 'rf_3OkD7HL...'
    },
    {
      id: '8',
      type: 'incoming',
      amount: 97.00,
      description: 'Template Landing Page - Vente',
      date: new Date('2024-02-14T13:15:00'),
      status: 'completed',
      source: 'Stripe',
      reference: 'pi_3OkC6GL...'
    }
  ]);

  const [filter, setFilter] = useState<'all' | 'incoming' | 'outgoing'>('all');
  const [searchQuery, setSearchQuery] = useState('');

  const filteredTransactions = transactions
    .filter(t => filter === 'all' || t.type === filter)
    .filter(t => t.description.toLowerCase().includes(searchQuery.toLowerCase()));

  const totalRevenue = transactions
    .filter(t => t.type === 'incoming' && t.status === 'completed')
    .reduce((sum, t) => sum + t.amount, 0);

  const totalExpenses = transactions
    .filter(t => t.type === 'outgoing' && t.status === 'completed')
    .reduce((sum, t) => sum + t.amount, 0);

  const netRevenue = totalRevenue - totalExpenses;

  const formatDate = (date: Date) => {
    return date.toLocaleDateString('fr-FR', { 
      day: 'numeric', 
      month: 'short', 
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'completed':
        return <CheckCircle className="w-4 h-4 text-green-400" />;
      case 'pending':
        return <Clock className="w-4 h-4 text-yellow-400" />;
      case 'failed':
        return <AlertCircle className="w-4 h-4 text-red-400" />;
      default:
        return <Clock className="w-4 h-4 text-gray-400" />;
    }
  };

  return (
    <div className="min-h-screen bg-black text-white relative overflow-hidden">
      {/* Background avec cadrillage */}
      <div className="absolute inset-0" 
           style={{
             backgroundImage: `
               linear-gradient(to right, rgba(255,255,255,0.1) 1px, transparent 1px),
               linear-gradient(to bottom, rgba(255,255,255,0.05) 1px, transparent 1px),
               radial-gradient(circle at center, rgba(32,108,232,0.3) 0%, transparent 70%)
             `,
             backgroundSize: '70px 80px, 70px 80px, 100% 100%'
           }} 
      />

      <div className="relative z-10 p-6 max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-6">
          <h1 className="text-4xl font-bold mb-2 text-center bg-gradient-to-r from-green-400 to-emerald-400 bg-clip-text text-transparent">
            Suivi des Revenus
          </h1>
          <p className="text-gray-300 text-lg text-center mb-6">
            Analyse détaillée de vos revenus et objectifs
          </p>

          {/* Stripe Connection */}
          <div className="led-card p-6 mb-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div className="p-3 rounded-full bg-blue-500/20">
                  <CreditCard className="w-8 h-8 text-blue-400" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-white">Connexion Stripe</h3>
                  <p className="text-gray-400 text-sm">
                    {isStripeConnected 
                      ? 'Compte connecté - Synchronisation automatique' 
                      : 'Connectez votre compte Stripe pour voir vos virements en temps réel'
                    }
                  </p>
                </div>
              </div>
              
              <button
                onClick={() => setIsStripeConnected(!isStripeConnected)}
                className={`px-6 py-3 rounded-lg font-medium transition-all ${
                  isStripeConnected 
                    ? 'bg-green-500/20 text-green-400 border border-green-500/30 hover:bg-green-500/30' 
                    : 'bg-blue-500 hover:bg-blue-600 text-white'
                }`}
              >
                {isStripeConnected ? '✓ Connecté' : 'Connecter Stripe'}
              </button>
            </div>
          </div>
        </div>

        {/* Revenue Overview */}
        <div className="grid md:grid-cols-3 gap-6 mb-8">
          <div className="led-card p-6">
            <div className="flex items-center gap-4">
              <div className="p-3 rounded-full bg-green-500/20">
                <TrendingUp className="w-8 h-8 text-green-400" />
              </div>
              <div>
                <p className="text-gray-400 text-sm">Revenus Totaux</p>
                <p className="text-3xl font-bold text-green-400">
                  €{totalRevenue.toLocaleString('fr-FR', { minimumFractionDigits: 2 })}
                </p>
              </div>
            </div>
          </div>

          <div className="led-card p-6">
            <div className="flex items-center gap-4">
              <div className="p-3 rounded-full bg-red-500/20">
                <TrendingDown className="w-8 h-8 text-red-400" />
              </div>
              <div>
                <p className="text-gray-400 text-sm">Dépenses</p>
                <p className="text-3xl font-bold text-red-400">
                  €{totalExpenses.toLocaleString('fr-FR', { minimumFractionDigits: 2 })}
                </p>
              </div>
            </div>
          </div>

          <div className="led-card p-6">
            <div className="flex items-center gap-4">
              <div className="p-3 rounded-full bg-blue-500/20">
                <DollarSign className="w-8 h-8 text-blue-400" />
              </div>
              <div>
                <p className="text-gray-400 text-sm">Revenus Nets</p>
                <p className="text-3xl font-bold text-blue-400">
                  €{netRevenue.toLocaleString('fr-FR', { minimumFractionDigits: 2 })}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Transactions Section */}
        <div className="led-card p-6">
          {/* Toolbar */}
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-4">
              <h2 className="text-2xl font-bold text-white">Historique des Virements</h2>
              {isStripeConnected && (
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 bg-green-400 rounded-full animate-pulse"></div>
                  <span className="text-green-400 text-sm">Synchronisé avec Stripe</span>
                </div>
              )}
            </div>
            
            <div className="flex items-center gap-3">
              <button className="p-2 rounded-lg bg-gray-700 hover:bg-gray-600 transition-colors">
                <Download className="w-4 h-4 text-gray-300" />
              </button>
              <button className="p-2 rounded-lg bg-gray-700 hover:bg-gray-600 transition-colors">
                <Calendar className="w-4 h-4 text-gray-300" />
              </button>
            </div>
          </div>

          {/* Filters */}
          <div className="flex items-center gap-4 mb-6">
            <div className="flex items-center gap-2">
              <button
                onClick={() => setFilter('all')}
                className={`px-4 py-2 rounded-lg text-sm transition-colors ${
                  filter === 'all' 
                    ? 'bg-blue-500 text-white' 
                    : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
                }`}
              >
                Tous
              </button>
              <button
                onClick={() => setFilter('incoming')}
                className={`px-4 py-2 rounded-lg text-sm transition-colors ${
                  filter === 'incoming' 
                    ? 'bg-green-500 text-white' 
                    : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
                }`}
              >
                Entrées
              </button>
              <button
                onClick={() => setFilter('outgoing')}
                className={`px-4 py-2 rounded-lg text-sm transition-colors ${
                  filter === 'outgoing' 
                    ? 'bg-red-500 text-white' 
                    : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
                }`}
              >
                Sorties
              </button>
            </div>

            <div className="flex-1 relative">
              <Search className="w-4 h-4 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                placeholder="Rechercher une transaction..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2 bg-gray-800 border border-gray-600 rounded-lg focus:border-blue-500 focus:outline-none text-white"
              />
            </div>
          </div>

          {/* Transactions List */}
          <div className="space-y-3">
            {filteredTransactions.map((transaction, index) => (
              <motion.div
                key={transaction.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ 
                  opacity: 1, 
                  y: 0,
                  transition: { delay: index * 0.05 }
                }}
                className="flex items-center gap-4 p-4 rounded-lg bg-gray-800/30 border border-gray-700/50 hover:border-gray-600/50 transition-all"
              >
                {/* Type Icon */}
                <div className={`p-3 rounded-full ${
                  transaction.type === 'incoming' 
                    ? 'bg-green-500/20' 
                    : 'bg-red-500/20'
                }`}>
                  {transaction.type === 'incoming' ? (
                    <ArrowUpRight className="w-5 h-5 text-green-400" />
                  ) : (
                    <ArrowDownLeft className="w-5 h-5 text-red-400" />
                  )}
                </div>

                {/* Transaction Details */}
                <div className="flex-1">
                  <div className="flex items-start justify-between">
                    <div>
                      <p className="font-medium text-white mb-1">{transaction.description}</p>
                      <div className="flex items-center gap-3 text-sm text-gray-400">
                        <span>{formatDate(transaction.date)}</span>
                        <span>•</span>
                        <span>{transaction.source}</span>
                        <span>•</span>
                        <span className="font-mono text-xs">{transaction.reference}</span>
                      </div>
                    </div>
                    
                    <div className="text-right">
                      <p className={`text-xl font-bold ${
                        transaction.type === 'incoming' ? 'text-green-400' : 'text-red-400'
                      }`}>
                        {transaction.type === 'incoming' ? '+' : '-'}€{transaction.amount.toLocaleString('fr-FR', { minimumFractionDigits: 2 })}
                      </p>
                      <div className="flex items-center gap-2 justify-end mt-1">
                        {getStatusIcon(transaction.status)}
                        <span className={`text-xs capitalize ${
                          transaction.status === 'completed' ? 'text-green-400' :
                          transaction.status === 'pending' ? 'text-yellow-400' :
                          'text-red-400'
                        }`}>
                          {transaction.status === 'completed' ? 'Terminé' :
                           transaction.status === 'pending' ? 'En attente' :
                           'Échoué'}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Summary Footer */}
          <div className="mt-6 pt-6 border-t border-gray-700">
            <div className="grid md:grid-cols-3 gap-4">
              <div className="text-center">
                <p className="text-gray-400 text-sm">Transactions ce mois</p>
                <p className="text-2xl font-bold text-white">{filteredTransactions.length}</p>
              </div>
              <div className="text-center">
                <p className="text-gray-400 text-sm">Taux de réussite</p>
                <p className="text-2xl font-bold text-green-400">
                  {Math.round((transactions.filter(t => t.status === 'completed').length / transactions.length) * 100)}%
                </p>
              </div>
              <div className="text-center">
                <p className="text-gray-400 text-sm">Montant moyen</p>
                <p className="text-2xl font-bold text-blue-400">
                  €{Math.round(totalRevenue / transactions.filter(t => t.type === 'incoming').length).toLocaleString('fr-FR')}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        .led-card {
          background: #1b1b1b;
          border-radius: 20px;
          border: 2px solid transparent;
          background-clip: padding-box;
          box-shadow:
            0 0 15px rgba(59, 130, 246, 0.4),
            0 0 30px rgba(96, 165, 250, 0.2),
            0 0 45px rgba(59, 130, 246, 0.2);
          position: relative;
          transition: all 0.3s ease;
        }
        .led-card:hover {
          transform: scale(1.01);
          box-shadow:
            0 0 20px rgba(59, 130, 246, 0.6),
            0 0 40px rgba(96, 165, 250, 0.4),
            0 0 60px rgba(59, 130, 246, 0.4);
        }
      `}</style>
    </div>
  );
}



