import pandas as pd
from sklearn.neighbors import NearestNeighbors

# Example property data
def recommend_properties(user_input):
    data = pd.DataFrame([
        {"price": 1000, "size": 500, "location": "New York"},
        {"price": 800, "size": 400, "location": "Chicago"},
        {"price": 1200, "size": 600, "location": "San Francisco"}
    ])
    
    # Process user input into DataFrame
    user_df = pd.DataFrame([user_input])
    
    # Fit nearest neighbors
    model = NearestNeighbors(n_neighbors=1)
    model.fit(data[["price", "size"]])
    
    # Find nearest property
    _, indices = model.kneighbors(user_df[["price", "size"]])
    return data.iloc[indices[0]].to_dict()

# Example usage
if __name__ == "__main__":
    user_input = {"price": 900, "size": 450}
    print(recommend_properties(user_input))
