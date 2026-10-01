import { useCallback, useState } from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { Screen } from '@/components/shared/screen';
import { GymCard } from '@/components/ui/gym-card';
import { palette, radius, space } from '@/constants/design-tokens';
import { useRepositoryData } from '@/hooks/use-repository-data';
import { gymRepository } from '@/services/gym';
import { formatRupiah, formatShortDate } from '@/utils/format';

type Tab = 'members' | 'packages' | 'tariffs';
export default function MembersScreen() {
  const [tab, setTab] = useState<Tab>('members');
  const members = useRepositoryData(useCallback(() => gymRepository.getMembers(), []), []).data;
  const packages = useRepositoryData(useCallback(() => gymRepository.getPackages(), []), []).data;
  const tariffs = useRepositoryData(useCallback(() => gymRepository.getVisitTariffs(), []), []).data;
  return <Screen title="Member" action={<Pressable style={styles.add}><Text style={styles.addText}>+ Tambah</Text></Pressable>}>
    <View style={styles.tabs}>{([['members', 'Member'], ['packages', 'Paket'], ['tariffs', 'Tarif Kunjungan']] as const).map(([id, label]) => <Pressable key={id} onPress={() => setTab(id)} style={[styles.tab, tab === id && styles.tabActive]}><Text style={[styles.tabText, tab === id && styles.tabTextActive]}>{label}</Text></Pressable>)}</View>
    {tab === 'members' && members.map((item) => <GymCard key={item.id}><View style={styles.row}><View style={styles.avatar}><Text style={styles.avatarText}>{item.name.charAt(0)}</Text></View><View style={styles.flex}><Text style={styles.title}>{item.name}</Text><Text style={styles.meta}>{item.id} · Paket {item.packageName}</Text><Text style={styles.meta}>Berakhir {formatShortDate(item.expiresAt)}</Text></View><Status value={item.status} /></View></GymCard>)}
    {tab === 'packages' && packages.map((item) => <GymCard key={item.id}><View style={styles.row}><View style={styles.flex}><Text style={styles.title}>{item.name}</Text><Text style={styles.meta}>{item.durationMonths} bulan · {item.activeMembers} member aktif</Text></View><Text style={styles.price}>{formatRupiah(item.price)}</Text></View></GymCard>)}
    {tab === 'tariffs' && tariffs.map((item) => <GymCard key={item.id}><View style={styles.row}><View style={styles.flex}><Text style={styles.title}>{item.name}</Text><Text style={styles.meta}>{item.id}</Text></View><Text style={styles.price}>{formatRupiah(item.price)}</Text></View></GymCard>)}
  </Screen>;
}
function Status({ value }: { value: 'active' | 'expiring' | 'expired' }) { const label = { active: 'Aktif', expiring: 'Hampir Habis', expired: 'Kadaluarsa' }[value]; return <Text style={[styles.badge, value === 'active' ? styles.active : value === 'expiring' ? styles.expiring : styles.expired]}>{label}</Text>; }
const styles = StyleSheet.create({ add: { backgroundColor: palette.primary, paddingHorizontal: 14, paddingVertical: 10, borderRadius: radius.md }, addText: { color: 'white', fontSize: 12, fontWeight: '800' }, tabs: { flexDirection: 'row', backgroundColor: palette.surface, borderRadius: radius.md, padding: 4 }, tab: { flex: 1, paddingVertical: 10, alignItems: 'center', borderRadius: 9 }, tabActive: { backgroundColor: palette.ink }, tabText: { color: palette.muted, fontSize: 11, fontWeight: '700' }, tabTextActive: { color: 'white' }, row: { flexDirection: 'row', alignItems: 'center', gap: space.md }, flex: { flex: 1 }, avatar: { width: 42, height: 42, borderRadius: 21, backgroundColor: palette.primarySoft, alignItems: 'center', justifyContent: 'center' }, avatarText: { color: palette.primary, fontWeight: '800' }, title: { color: palette.ink, fontSize: 14, fontWeight: '800' }, meta: { color: palette.muted, fontSize: 11, marginTop: 3 }, price: { color: palette.ink, fontSize: 13, fontWeight: '800' }, badge: { fontSize: 9, fontWeight: '800', paddingHorizontal: 7, paddingVertical: 4, borderRadius: radius.pill, overflow: 'hidden' }, active: { color: '#15803D', backgroundColor: '#DCFCE7' }, expiring: { color: '#B45309', backgroundColor: '#FEF3C7' }, expired: { color: '#B91C1C', backgroundColor: '#FEE2E2' } });
