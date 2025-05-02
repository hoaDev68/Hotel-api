import { Injectable } from "@nestjs/common";

@Injectable()
export class BotService {
  private responses = [
    {
      keywords: ['giá', 'bao nhiêu'],
      response: 'Giá phòng dao động từ 800.000đ đến 1.500.000đ tùy loại phòng và tiện nghi.',
    },
    {
      keywords: ['wifi', 'internet'],
      response: 'Khách sạn có wifi miễn phí cho tất cả các phòng và khu vực chung.',
    },
    {
      keywords: ['checkin', 'giờ vào', 'nhận phòng'],
      response: 'Thời gian nhận phòng từ 14:00 và trả phòng trước 12:00 hôm sau.',
    },
    {
      keywords: ['xin chào'],
      response: 'Xin chào! Tôi có thể giúp gì cho bạn?',
    },
    {
      keywords: ['loại phòng', 'các loại phòng', 'có những phòng nào'],
      response: 'Chúng tôi có các loại phòng: DELUXE, SINGLE, STANDER và FAMILY phù hợp cho cá nhân hoặc gia đình.',
    },
    {
      keywords: ['deluxe', 'phòng deluxe'],
      response: 'Phòng DELUXE có hướng biển, đầy đủ tiện nghi, giá khoảng 1.200.000đ/đêm, dành cho 2 người.',
    },
    {
      keywords: ['single', 'phòng đơn'],
      response: 'Phòng SINGLE dành cho 1 người, đầy đủ tiện nghi, giá khoảng 800.000đ/đêm.',
    },
    {
      keywords: ['stander', 'phòng gia đình'],
      response: 'Phòng STANDER dành cho gia đình, chứa tối đa 4 người, giá khoảng 1.500.000đ/đêm.',
    },
    {
      keywords: ['phòng family', 'phòng gia đình'],
      response: 'Phòng FAMILY dành cho gia đình, chứa tối đa 6 người, giá khoảng 1.800.000đ/đêm.',
    },
    {
      keywords: ['tiện nghi', 'trang thiết bị'],
      response: 'Tất cả các phòng đều có điều hòa, TV, minibar, và phòng tắm riêng với nước nóng lạnh.',
    },
    {
      keywords: ['số lượng', 'còn bao nhiêu phòng'],
      response: 'Mỗi loại phòng còn khoảng 5 phòng trống. Hãy đặt sớm để giữ chỗ nhé!',
    },
    {
      keywords: ['hủy phòng', 'đổi phòng'],
      response: 'Bạn có thể hủy hoặc đổi phòng miễn phí trước 24 giờ so với thời gian nhận phòng.',
    },
  ];

  public getResponse(message: string): string {
    const lowerMessage = message.toLowerCase();

    for (const item of this.responses) {
      if (item.keywords.some((kw) => lowerMessage.includes(kw))) {
        return item.response;
      }
    }

    return 'Xin lỗi, tôi chưa hiểu câu hỏi của bạn. Vui lòng cung cấp thêm thông tin.';
  }
}
