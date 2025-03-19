import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { PhieuDatPhong } from 'src/booking/booking.entity';

@Entity()
export class KhachHang {
  @PrimaryGeneratedColumn('uuid')
  maKH: string;

  @Column()
  hoTen: string;

  @Column({ unique: true })
  cmtnd: string;

  @Column()
  diaChi: string;

  @Column()
  sdt: string;

  @OneToMany(() => PhieuDatPhong, (phieuDatPhong) => phieuDatPhong.khachHang)
  phieuDatPhongs: PhieuDatPhong[];

  // Hàm hỗ trợ
  dangKyTaiKhoan(): string {
    return `Tài khoản cho khách hàng ${this.hoTen} đã được đăng ký.`;
  }
}
