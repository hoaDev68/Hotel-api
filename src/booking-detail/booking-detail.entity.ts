import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { PhieuDatPhong } from 'src/booking/booking.entity';
import { Phong } from 'src/room/room.entity';

@Entity()
export class ChiTietDatPhong {
  @PrimaryGeneratedColumn('uuid')
  maChiTiet: string;

  @ManyToOne(() => PhieuDatPhong, (phieuDatPhong) => phieuDatPhong.chiTietDatPhongs, { onDelete: 'CASCADE' })
  phieuDatPhong: PhieuDatPhong;

  @ManyToOne(() => Phong, (phong) => phong.chiTietDatPhongs, { onDelete: 'CASCADE' })
  phong: Phong;

  @Column({ nullable: true })
  ghiChu: string;

  // Hàm hỗ trợ
  tinhTienPhong(): number {
    return this.phong?.giaPhong || 0;
  }
}
