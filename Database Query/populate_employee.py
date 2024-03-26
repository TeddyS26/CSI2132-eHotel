import psycopg2
import random

conn = psycopg2.connect(
    dbname='eHotel', user='postgres', password='(your password)', host='localhost'
)
cur = conn.cursor()

first_names = [
    "John", "Jane", "Alice", "Bob", "Charlie", "Diana", "Ethan", "Fiona", "Mike", "Nancy", "Marwan", "Vivek", "Mostafa",
    "Teddy", "Michael", "Nicholas", "Jonathan", "Charlotte", "Michelle", "Anna", "Mary", "Selena", "Madison", "Maria",
    "Olivia", "Emma", "Ava", "Sophia", "Isabella", "Mia", "Amelia", "Harper", "Evelyn", "Abigail", "Emily", "Elizabeth",
    "Sofia", "Avery", "Ella", "Scarlett", "Grace", "Chloe", "Victoria", "Riley", "Aria", "Lily", "Aubrey", "Zoe", "Penelope",
    "Lillian", "Addison", "Layla", "Natalie", "Camila", "Hannah", "Brooklyn", "Zara", "Norah", "Maya", "Mila", "Leah",
    "Savannah", "Audrey", "Claire", "Eleanor", "Skylar", "Ellie", "Samantha", "Stella", "Paisley", "Violet", "Mila",
    "Kylie", "Aaliyah", "Lucy", "Luna", "Ruby", "Eva", "Naomi", "Alice", "Bella", "Lydia", "Peyton", "Melanie", "Katherine",
    "Maya", "Autumn", "Piper", "Hailey", "Ariana", "Kaylee", "Alina", "Gabriella", "Madelyn", "Adeline", "Alexa", "Sienna"
]
middle_names = [None, None, None, None, None, None, None, None, None, None, None, None, None, None, None, None, None, "A.", "B.", "C.", "D.", "E.", "F.", "G.", "H.", "I.", "J.", "K.", "L.", "M.", "N.", "O.", "P."]
last_names = [
    "Doe", "Smith", "Johnson", "Brown", "Davis", "Garcia", "Wilson", "Miller", "Taylor", "Anderson", "Mashaly", "Yassine", 
    "Bhandari", "Colasante", "Yeung", "Baskaren", "Sannan", "Dory", "Madut", "Rao", "Gomez", "Beer", "Norlock",
    "Williams", "Jones", "Robinson", "Clark", "Lewis", "Lee", "Walker", "Hall", "Allen", "Young", "Hernandez", 
    "King", "Wright", "Lopez", "Hill", "Scott", "Green", "Adams", "Baker", "Gonzalez", "Nelson", "Carter", "Mitchell",
    "Perez", "Roberts", "Turner", "Phillips", "Campbell", "Parker", "Evans", "Edwards", "Collins", "Stewart", "Sanchez",
    "Morris", "Rogers", "Reed", "Cook", "Morgan", "Bell", "Murphy", "Bailey", "Rivera", "Cooper", "Richardson", "Cox",
    "Howard", "Ward", "Torres", "Peterson", "Gray", "Ramirez", "James", "Watson", "Brooks", "Kelly", "Sanders", 
    "Price", "Bennett", "Wood", "Barnes", "Ross", "Henderson", "Coleman", "Jenkins", "Perry", "Powell", "Long", 
    "Patterson", "Hughes", "Flores", "Washington", "Butler"
]
street_names = [
    "Main", "Oak", "Pine", "Elm", "Maple", "Cedar", "Birch", "Walnut", "Willow", "Park", "Dunblane", "Gleecen", "Astoria",
    "Walkley", "Crestway", "Strandherd", "Lyon", "Locus Terrace",
    "River", "Hillside", "Sunnybrook", "Meadow", "Forest", "Ridge", "Valley", "Lake", "Brook", "Bridge", "Creek",
    "Highland", "View", "Shore", "Woodland", "Spring", "North", "South", "East", "West", "Sunset", "Vine", "Cherry",
    "Peach", "High", "Low", "Diamond", "Ruby", "Emerald", "Sapphire", "Garden", "Orchard", "Rose", "Lilac", "Magnolia",
    "Holly", "Juniper", "Aspen", "Poplar", "Fir", "Spruce", "Chestnut", "Hazel", "Marigold", "Ivy", "Laurel", "Ocean",
    "Bay", "Harbor", "Palm", "Fountain", "Cliff", "Summit"
]
cities = [
    "Ottawa", "Toronto", "Los Angeles", "Vancouver", "Miami", "Atlanta", "Seattle", "New York", "San Francisco",
    "Chicago", "Montreal", "Quebec City", "Dallas", "Houston", "Boston", "Denver", "Philadelphia", "Calgary",
    "Edmonton", "Halifax", "Winnipeg", "Saskatoon", "Regina", "Victoria", "Kingston", "London", "Hamilton", "Kitchener",
    "Waterloo", "St. John's"
]
states = [
    "ON", "CA", "FL", "GA", "WA", "NY", "IL", "QC", "TX", "MA", "CO", "PA", "BC", "AB", "NS", "MB", "SK", "NL"
]

us_cities_states = [
    ('Los Angeles', 'CA', '900'),
    ('Miami', 'FL', '331'),
    ('Atlanta', 'GA', '303'),
    ('Seattle', 'WA', '981'),
    ('New York', 'NY', '100'),
    ('San Francisco', 'CA', '941'),
    ('Chicago', 'IL', '606'),
    ('Dallas', 'TX', '752'),
    ('Houston', 'TX', '770'),
    ('Boston', 'MA', '021'),
    ('Denver', 'CO', '802'),
    ('Philadelphia', 'PA', '191')
]
canadian_cities_states = [
    ('Ottawa', 'ON', 'K1A'),
    ('Toronto', 'ON', 'M5H'),
    ('Vancouver', 'BC', 'V5K'),
    ('Montreal', 'QC', 'H2Y'),
    ('Quebec City', 'QC', 'G1A'),
    ('Calgary', 'AB', 'T2P'),
    ('Edmonton', 'AB', 'T5J'),
    ('Halifax', 'NS', 'B3J'),
    ('Winnipeg', 'MB', 'R3C'),
    ('Saskatoon', 'SK', 'S7K'),
    ('Regina', 'SK', 'S4P'),
    ('Victoria', 'BC', 'V8W'),
    ("St. John's", 'NL', 'A1C')
]

roles = ["Manager", "Employee"]
hotel_ids = list(range(1, 41))
ssns = set()

def generate_ssn(is_us, ssns):
    while True:
        ssn = "".join([str(random.randint(0, 9)) for _ in range(9)])
        if ssn not in ssns:
            ssns.add(ssn)
            return ssn

def generate_zip(city_state_tuple):
    prefix = city_state_tuple[2]
    if city_state_tuple[1] in ['CA', 'ON', 'QC', 'BC']:
        return prefix + "".join([str(random.randint(0, 9)) for _ in range(3)])
    else:
        return prefix + "".join([str(random.randint(0, 9)) for _ in range(2)])

def maybe_generate_apartment_number():
    if random.random() < 0.3:
        return random.randint(1, 100)
    else:
        return None


for hotel_id in hotel_ids:
    if hotel_id % 2 == 0:
        city_state_tuple = random.choice(canadian_cities_states)
    else:
        city_state_tuple = random.choice(us_cities_states)

    city, state, _ = city_state_tuple
    zip_code = generate_zip(city_state_tuple)
    is_us = state not in ['ON', 'QC', 'BC', 'AB', 'NS', 'MB', 'SK', 'NL']

    for i in range(3):  # Assuming you want to insert 3 employees per hotel
        first_name = random.choice(first_names)
        middle_name = random.choice(middle_names)
        last_name = random.choice(last_names)
        street_number = random.randint(100, 999)
        street_name = random.choice(street_names) + random.choice([" Street", " Drive", " Crescent", " Way", " Road"])
        apartment_number = maybe_generate_apartment_number()
        role = 'Manager' if i == 0 else 'Employee'
        ssn_sin = generate_ssn(is_us, ssns)

        # Now inserting with ssn_sin as a key
        cur.execute(
            "INSERT INTO Employee (ssn_sin, first_name, middle_name, last_name, street_number, street_name, apt_number, city, state, zip, role, hotelId) VALUES (%s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s)",
            (ssn_sin, first_name, middle_name, last_name, street_number, street_name, apartment_number, city, state, zip_code, role, hotel_id)
        )

conn.commit()
cur.close()
conn.close()