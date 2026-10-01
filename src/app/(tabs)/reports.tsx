import { useCallback } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Screen } from '@/components/shared/screen';
import { GymCard } from '@/components/ui/gym-card';
import { palette } from '@/constants/design-tokens';
import { useRepositoryData } from '@/hooks/use-repository-data';
import { gymRepository } from '@/services/gym';
import { formatRupiah } from '@/utils/format';
export default function ReportsScreen() {
  const transactions = useRepositoryData(useCallback(() => gymRepository.getTransactions(), []), []).data;
  const revenue = transactions.reduce((sum, item) => sum + item.amount, 0);
  const membership = transactions.filter((item) => item.type === 'membership').reduce((sum, item) => sum + item.amount, 0);
  const walkin = revenue - membership;
  return <Screen title="Laporan" subtitle="Ringkasan hari ini">
    <GymCard><Text style={styles.label}>Total Pendapatan</Text><Text style={styles.total}>{formatRupiah(revenue)}</Text><Text style={styles.change}>↑ 12% dibanding kemarin</Text></GymCard>
    <View style={styles.row}><GymCard style={styles.half}><Text style={styles.label}>Membership</Text><Text style={styles.value}>{formatRupiah(membership)}</Text></GymCard><GymCard style={styles.half}><Text style={styles.label}>Walk-in</Text><Text style={styles.value}>{formatRupiah(walkin)}</Text></GymCard></View>
    <GymCard><Text style={styles.heading}>Metode Pembayaran</Text>{(['cash', 'transfer', 'qris'] as const).map((method) => { const count = transactions.filter((item) => item.paymentMethod === method).length; return <View key={method} style={styles.method}><Text style={styles.methodName}>{method.toUpperCase()}</Text><Text style={styles.methodCount}>{count} transaksi</Text></View>; })}</GymCard>
  </Screen>;
}
const styles = StyleSheet.create({ label: { color: palette.muted, fontSize: 12, fontWeight: '600' }, total: { color: palette.ink, fontSize: 27, fontWeight: '900', marginTop: 8 }, change: { color: palette.primary, fontSize: 11, fontWeight: '700', marginTop: 6 }, row: { flexDirection: 'row', gap: 10 }, half: { flex: 1 }, value: { color: palette.ink, fontSize: 15, fontWeight: '800', marginTop: 8 }, heading: { color: palette.ink, fontSize: 15, fontWeight: '800', marginBottom: 8 }, method: { flexDirection: 'row', justifyContent: 'space-between', paddingVertical: 10, borderBottomColor: palette.border, borderBottomWidth: StyleSheet.hairlineWidth }, methodName: { color: palette.ink, fontSize: 12, fontWeight: '700' }, methodCount: { color: palette.muted, fontSize: 11 } });
