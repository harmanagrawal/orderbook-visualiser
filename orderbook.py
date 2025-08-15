import pandas as pd

def process_order_book(data):
    bids_df = pd.DataFrame(data["bids"], columns=["Price", "Quantity"], dtype=float)
    asks_df = pd.DataFrame(data["asks"], columns=["Price", "Quantity"], dtype=float)

    bids_df = bids_df.sort_values("Price", ascending=False)
    asks_df = asks_df.sort_values("Price", ascending=True)

    bids_df["Cumulative"] = bids_df["Quantity"].cumsum()
    asks_df["Cumulative"] = asks_df["Quantity"].cumsum()

    return {
        "bids": bids_df.to_dict(orient="records"),
        "asks": asks_df.to_dict(orient="records"),
    }
