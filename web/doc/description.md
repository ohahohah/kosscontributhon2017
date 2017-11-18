# Web 구성
- section 단위로 데이터 시각화 chart 구성

## 1. 특정 시기 장르 선호도 multi-Line-chart
- 장르별 연도단위 전체 선호도 (7개년) 
- 한눈에 볼 수 있게 구성
-  Bootstrap Section : All Info
- x축 : 날짜 / y축 : 선호도(%) 
- 각 Line = 장르 , 총 8 Line
 
## 2. 개별 장르의 월별 선호도 (sunburst)
- Bootstrap Section : Genre Sort
- 장르별 차트 총 8 차트
- 1depth 연도별 - 2depth 분기별 
- 선호도 % 계산

## 3. 장르별 선호도 - 동적 변경 게이지 차트(progress chart)
- Bootstrap Section :  AND..
- 장르별 시간별 선호도 변경 (총 8차트)

### 참고.  
#### 장르별 색깔매핑
   - #d53e4f - 빨간색 - R&B/Soul
   - #f46d43 - 주황색 - Ballade
   - #660E34 - 분홍색 - Indie
   - #fee08b - 노란색 - Rock/Metal
   - #abdda4 - 연두색 - Trot
   - #66c2a5 - 초록색 - Dance
   - #3288bd - 파란색 - Rap/Hiphop
   - #5e4fa2 - 보라색 - Folk/Blues