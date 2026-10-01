import { useCallback } from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { Screen } from '@/components/shared/screen';
import { GymCard } from '@/components/ui/gym-card';
import { palette, radius } from '@/constants/design-tokens';
import { useRepositoryData } from '@/hooks/use-repository-data';
import { gymRepository } from '@/services/gym';
import { formatRupiah } from '@/utils/format';
export default function TransactionsScreen() {
  const transactions = useRepositoryData(useCallback(() => gymRepository.getTransactions(), []), []).data;
  return <Screen title="Transaksi" subtitle="Membership dan kunjungan walk-in" action={<Pressable style={styles.add}><Text style={styles.addText}>+ Baru</Text></Pressable>}>
    {transactions.map((item) => <GymCard key={item.id}><View style={styles.row}><View style={[styles.icon, item.type === 'walk-in' && styles.walkin]}><Text>{item.type === 'walk-in' ? 'W' : 'M'}</Text></View><View style={styles.flex}><Text style={styles.title}>{item.customerName}</Text><Text style={styles.meta}>{item.itemName} · {item.paymentMethod.toUpperCase()}</Text><Text style={styles.id}>{item.id}</Text></View><Text style={styles.amount}>{formatRupiah(item.amount)}</Text></View></GymCard>)}
  </Screen>;
}
const styles = StyleSheet.create({ add: { backgroundColor: palette.primary, paddingHorizontal: 14, paddingVertical: 10, borderRadius: radius.md }, addText: { color: 'white', fontWeight: '800', fontSize: 12 }, row: { flexDirection: 'row', alignItems: 'center', gap: 12 }, icon: { width: 40, height: 40, borderRadius: 12, backgroundColor: palette.primarySoft, alignItems: 'center', justifyContent: 'center' }, walkin: { backgroundColor: '#FEF3C7' }, flex: { flex: 1 }, title: { fontSize: 14, fontWeight: '800', color: palette.ink }, meta: { fontSize: 11, color: palette.muted, marginTop: 3 }, id: { fontSize: 10, color: palette.subtle, marginTop: 2 }, amount: { fontSize: 13, fontWeight: '800', color: palette.ink } });
