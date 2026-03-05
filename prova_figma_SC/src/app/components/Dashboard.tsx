import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Badge } from './ui/badge';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Search, Car, Calendar, User, Check, X, Bell, LogOut } from 'lucide-react';
import { praticheMock, Pratica, getStatoLabel, getStatoColor } from '../data/mockData';
import { useState, useEffect } from 'react';
import { toast } from 'sonner';
import { notificationService, Notification } from '../services/notificationService';
import { useNavigate } from 'react-router';

export function Dashboard() {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');
  const [filtroStato, setFiltroStato] = useState<string>('tutti');
  const [filtroAssegnazione, setFiltroAssegnazione] = useState<'tutte' | 'assegnate' | 'non_assegnate'>('assegnate');
  const [pratiche, setPratiche] = useState(praticheMock);
  const [notificationCount, setNotificationCount] = useState(0);
  const [notifications, setNotifications] = useState<Notification[]>([]);

  useEffect(() => {
    const unsubscribe = notificationService.subscribe(setNotificationCount);
    const unsubscribeNotifications = notificationService.subscribeNotifications(setNotifications);
    return () => {
      unsubscribe();
      unsubscribeNotifications();
    };
  }, []);

  const handleAccettaPratica = (praticaId: string, e: React.MouseEvent) => {
    e.stopPropagation();
    setPratiche(pratiche.map(p => p.id === praticaId ? { ...p, assegnata: true } : p));
    notificationService.decrementCount();
    toast.success('Pratica accettata e assegnata all\'officina');
  };

  const handleRifiutaPratica = (praticaId: string, e: React.MouseEvent) => {
    e.stopPropagation();
    setPratiche(pratiche.filter(p => p.id !== praticaId));
    notificationService.decrementCount();
    toast.success('Pratica rifiutata');
  };

  const handleLogout = () => {
    toast.success('Logout effettuato');
    navigate('/');
  };

  const handlePraticaClick = (pratica: Pratica) => {
    navigate(`/pratica/${pratica.id}`);
  };

  const praticheFiltrate = pratiche.filter(pratica => {
    const matchSearch = 
      pratica.numero.toLowerCase().includes(searchTerm.toLowerCase()) ||
      pratica.targa.toLowerCase().includes(searchTerm.toLowerCase()) ||
      pratica.cliente.toLowerCase().includes(searchTerm.toLowerCase());
    const matchStato = filtroStato === 'tutti' || pratica.stato === filtroStato;
    const matchAssegnazione = 
      filtroAssegnazione === 'tutte' ||
      (filtroAssegnazione === 'assegnate' && pratica.assegnata) ||
      (filtroAssegnazione === 'non_assegnate' && !pratica.assegnata);
    return matchSearch && matchStato && matchAssegnazione;
  });

  const stats = {
    totale: pratiche.filter(p => p.assegnata).length,
    in_attesa: pratiche.filter(p => p.stato === 'in_attesa' && p.assegnata).length,
    in_lavorazione: pratiche.filter(p => p.stato === 'in_lavorazione' && p.assegnata).length,
    in_attesa_riconsegna: pratiche.filter(p => p.stato === 'in_attesa_riconsegna' && p.assegnata).length,
    non_assegnate: pratiche.filter(p => !p.assegnata).length,
  };

  return (
    <div className="min-h-screen bg-[#F4F4F4]">
      <div className="bg-[#088395] border-b border-[#09637E]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 md:py-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-xl md:text-3xl text-white font-semibold">Dashboard</h1>
              <p className="text-[#EBF4F6] text-xs md:text-sm mt-1">Gestione pratiche e riparazioni</p>
            </div>
            <div className="flex items-center gap-2 md:gap-4">
              <Button variant="ghost" size="icon" onClick={() => navigate('/notifiche')} className="relative bg-white/10 hover:bg-white/20 text-white">
                <Bell className="h-5 w-5" />
                {notificationCount > 0 && (
                  <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                    {notificationCount}
                  </span>
                )}
              </Button>
              <Button variant="ghost" size="icon" onClick={handleLogout} className="bg-white/10 hover:bg-white/20 text-white flex">
                <LogOut className="h-5 w-5" />
              </Button>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-6">
          <Card>
            <CardHeader className="p-3 md:p-4 pb-0 md:pb-2">
              <CardTitle className="text-xs md:text-sm text-[#10546D]">Totale</CardTitle>
            </CardHeader>
            <CardContent className="p-3 md:p-4 pt-0">
              <p className="text-2xl md:text-3xl font-bold text-[#088395]">{stats.totale}</p>
            </CardContent>
          </Card>
          {/* ... altre card statistiche ... */}
          <Card>
            <CardHeader className="p-3 md:p-4 pb-0 md:pb-2">
              <CardTitle className="text-xs md:text-sm text-[#10546D]">In Attesa</CardTitle>
            </CardHeader>
            <CardContent className="p-3 md:p-4 pt-0">
              <p className="text-2xl md:text-3xl font-bold text-[#5F9598]">{stats.in_attesa}</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="p-3 md:p-4 pb-0 md:pb-2">
              <CardTitle className="text-xs md:text-sm text-[#10546D]">In Lavoro</CardTitle>
            </CardHeader>
            <CardContent className="p-3 md:p-4 pt-0">
              <p className="text-2xl md:text-3xl font-bold text-[#09637E]">{stats.in_lavorazione}</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="p-3 md:p-4 pb-0 md:pb-2">
              <CardTitle className="text-xs md:text-sm text-[#10546D]">Pronte</CardTitle>
            </CardHeader>
            <CardContent className="p-3 md:p-4 pt-0">
              <p className="text-2xl md:text-3xl font-bold text-[#088395]">{stats.in_attesa_riconsegna}</p>
            </CardContent>
          </Card>
        </div>

        <Card className="mb-6">
          <CardContent className="p-4 md:p-6 space-y-4">
            <div className="flex gap-2 pb-4 border-b">
              <Button variant={filtroAssegnazione === 'assegnate' ? 'default' : 'outline'} onClick={() => setFiltroAssegnazione('assegnate')} className="flex-1 text-xs md:text-sm h-10">
                Assegnate ({stats.totale})
              </Button>
              <Button variant={filtroAssegnazione === 'non_assegnate' ? 'default' : 'outline'} onClick={() => setFiltroAssegnazione('non_assegnate')} className="flex-1 text-xs md:text-sm h-10">
                Nuove ({stats.non_assegnate})
              </Button>
            </div>
            <div className="flex flex-col md:flex-row gap-3">
              <div className="flex-1 relative">
                <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                <Input placeholder="Cerca targa o cliente..." className="pl-10 h-10 text-sm" value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} />
              </div>
            </div>
          </CardContent>
        </Card>

        <div className="space-y-3">
          {praticheFiltrate.map((pratica) => (
            <Card key={pratica.id} className="hover:shadow-md transition-shadow overflow-hidden" onClick={() => pratica.assegnata && handlePraticaClick(pratica)}>
              <CardContent className="p-4 md:p-6">
                <div className="flex flex-col lg:flex-row lg:items-center gap-4">
                   <div className="flex-1 w-full">
                      <div className="flex flex-wrap items-center gap-2 mb-4">
                        <span className="text-base md:text-lg font-bold mr-1">{pratica.numero}</span>
                        <Badge className={`${getStatoColor(pratica.stato)} border text-[10px] md:text-xs`}>
                          {getStatoLabel(pratica.stato)}
                        </Badge>
                      </div>
                      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-2 md:gap-4 text-sm">
                        <div className="flex items-start gap-2 bg-gray-50 p-2.5 rounded-lg border border-gray-100">
                          <Car className="h-4 w-4 text-[#088395] shrink-0 mt-0.5" />
                          <div className="min-w-0">
                            <p className="text-xs text-gray-500">Veicolo</p>
                            <p className="font-medium truncate">{pratica.veicolo.marca} {pratica.veicolo.modello}</p>
                          </div>
                        </div>
                        <div className="flex items-start gap-2 bg-gray-50 p-2.5 rounded-lg border border-gray-100">
                          <User className="h-4 w-4 text-[#088395] shrink-0 mt-0.5" />
                          <div className="min-w-0">
                            <p className="text-xs text-gray-500">Cliente</p>
                            <p className="font-medium truncate">{pratica.automobilista.nome} {pratica.automobilista.cognome}</p>
                          </div>
                        </div>
                        <div className="flex items-start gap-2 bg-gray-50 p-2.5 rounded-lg border border-gray-100 sm:col-span-2 md:col-span-1">
                          <Calendar className="h-4 w-4 text-[#088395] shrink-0 mt-0.5" />
                          <div>
                            <p className="text-xs text-gray-500">Apertura</p>
                            <p className="font-medium">{new Date(pratica.dataApertura).toLocaleDateString('it-IT')}</p>
                          </div>
                        </div>
                      </div>
                   </div>
                   <div className="w-full lg:w-auto">
                      <Button onClick={(e) => !pratica.assegnata && handleAccettaPratica(pratica.id, e)} className="w-full bg-[#088395]">
                        {pratica.assegnata ? 'Visualizza' : 'Accetta'}
                      </Button>
                   </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}
