export type Review = {
  id: number
  name: string
  location: string
  rating: number
  text: string
  isLocalGuide?: boolean
  avatar?: string
}

export const reviews: Review[] = [
  { id: 1, name: 'Imran Khan', location: 'Hubballi', rating: 5, isLocalGuide: true, text: 'Absolutely fantastic experience at Hayat! The Beef Biryani is the best I have had in Hubballi — perfectly fragrant, tender meat, and the dum cooking makes all the difference. Will definitely return!' },
  { id: 2, name: 'Rashida Begum', location: 'Hubballi', rating: 5, text: 'The Tandoori Chicken is absolutely divine — smoky, juicy and perfectly spiced. Hayat has become our family\'s go-to restaurant for every special occasion. Highly recommended!' },
  { id: 3, name: 'Aryaman Sinha', location: 'Hubballi', rating: 5, text: 'Service was quick and the overall experience was worth every rupee. The Lazeez Kabab is their signature and it truly lives up to the name. A world-class culinary experience.' },
  { id: 4, name: 'Priya Sharma', location: 'Hubballi', rating: 5, text: 'The Beef Kadai is outstanding — rich, robust and perfectly balanced. The AC dining hall is very comfortable and perfect for family gatherings. Hayat never disappoints!' },
  { id: 5, name: 'Mohammed Rafi', location: 'Hubballi', rating: 5, text: 'Hayat is without doubt the best restaurant in Hubballi. The Beef Biryani is a royal experience — fragrant, slow-cooked, and absolutely unforgettable.' },
  { id: 6, name: 'Suresh Patil', location: 'Hubballi', rating: 4, text: 'Great food and excellent ambiance. The Gulzari Kabab was perfectly marinated and grilled to perfection. A little premium priced but absolutely worth every rupee.' },
  { id: 7, name: 'Yasmeen Shaikh', location: 'Dharwad', rating: 5, text: 'Came from Dharwad specifically for the Beef Biryani after my friend recommended it. Was not disappointed at all! The flavors are incredible and authentic. Will come again!' },
  { id: 8, name: 'Rahul Desai', location: 'Hubballi', rating: 5, text: 'Best biryani in Hubballi by far. The Beef Biryani with Basmati is on another level. The Chicken 65 is also superb — crispy and perfectly spiced!' },
  { id: 9, name: 'Anjali Nair', location: 'Hubballi', rating: 5, text: 'Beautiful restaurant with warm, premium ambiance. The Waiting Area is cosy and staff is very welcoming. Food quality is exceptional — very impressed!' },
  { id: 10, name: 'Kiran Hegde', location: 'Hubballi', rating: 4, text: 'Wonderful family dining experience at Hayat. The staff was very attentive and the Paneer Butter Masala was creamy and delicious. Kids loved the Chicken Popcorn too!' },
  { id: 11, name: 'Vishal Joshi', location: 'Hubballi', rating: 5, text: 'Celebrated my anniversary here and the team arranged a beautiful setup. The Beef Roghan Josh was exceptional and the service was impeccable. Made our evening truly memorable.' },
  { id: 12, name: 'Meena Reddy', location: 'Hubli', rating: 5, text: 'The Beef Handi is a must-order! Rich, flavourful and absolutely divine. The naans are fresh from the tandoor. One of the finest dining experiences in North Karnataka.' },
]
