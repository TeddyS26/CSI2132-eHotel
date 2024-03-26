import psycopg2
import random

# Establish connection to the PostgreSQL database
conn = psycopg2.connect(
    dbname='eHotel', user='postgres', password='(your password)', host='localhost'
)
cur = conn.cursor()

# Predefined lists for room characteristics
views = ['Sea', 'Mountain', 'Normal']
comments = [
    None, None, None, None, None, None, None, None, None, None,
    'Some minor issues with the air conditioning',
    'Requires repaint; minor scratches on walls',
    'Bathroom door does not close properly',
    'Window lock is damaged'
]
amenities = ['Wi-Fi', 'TV', 'Fridge', 'Air Conditioner', 'Safe (Locker)', 'Pet-Friendly']
capacities = ['Single', 'Double', 'Twin', 'Queen', 'King']
extendables = [True, False]

# Insert data into the room table
for chain_id in range(1, 6):  # 5 chains
    for hotel_id in range((chain_id - 1) * 8 + 1, chain_id * 8 + 1):
        for room_index in range(5):  # 5 rooms per hotel
            view = random.choice(views)
            extendable = random.choice(extendables)
            price = random.randint(120, 200)
            comment = random.choice(comments)
            room_amenities = random.sample(amenities, random.randint(1, len(amenities)))
            capacity = random.choice(capacities)
            room_number = 100 * chain_id + room_index

            amenities_string = ', '.join(room_amenities)

            cur.execute(
                "INSERT INTO room (hotelid, room_number, view, extendable, price, comment, amenities, capacity, not_available_dates) VALUES (%s, %s, %s, %s, %s, %s, %s, %s, %s)",
                (hotel_id, room_number, view, extendable, price, comment, amenities_string, capacity, '{}')
            )

# Commit the transaction to the database
conn.commit()

# Close the cursor and connection to clean up
cur.close()
conn.close()