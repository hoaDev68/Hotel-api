import { Column, Entity, OneToMany, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { ChiTietDatPhong } from 'src/booking-detail/booking-detail.entity';
import { KhachHang } from 'src/customer/customer.entity';

@Entity()
export class PhieuDatPhong {
  @PrimaryGeneratedColumn('uuid')
  maPhieu: string;

  @ManyToOne(() => KhachHang, (khachHang) => khachHang.phieuDatPhongs, { onDelete: 'CASCADE' })
  khachHang: KhachHang;

  @Column({ type: 'date' })
  ngayVao: Date;

  @Column({ type: 'date' })
  ngayRa: Date;

  @Column('double precision', { default: 0 })
  tongTien: number;

  @OneToMany(() => ChiTietDatPhong, (chiTietDatPhong) => chiTietDatPhong.phieuDatPhong)
  chiTietDatPhongs: ChiTietDatPhong[];

  // Hàm hỗ trợ
  tinhTien(): number {
    return this.chiTietDatPhongs?.reduce((total, chiTiet) => total + chiTiet.tinhTienPhong(), 0) || 0;
  }
}
