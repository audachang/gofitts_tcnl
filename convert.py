import pandas as pd
import ast

from pathlib import Path

dir_root = Path("./example_data")

HALF_WIDTH = 960
HALF_HEIGHT = 540

df = pd.read_csv(dir_root / 'collected.csv')
df = df[["sequence_loop.thisN", "trial_loop.thisN", "from", "to", "mouse.x", "mouse.y", "mouse.time", "w", "a"]]

df.rename(columns={"sequence_loop.thisN": "seq", "trial_loop.thisN": "trial", "mouse.x": "x", "mouse.y": "y",
                   "mouse.time": "t"}, inplace=True)

# drop nans in df
df = df.dropna()
df["w"] = df["w"].astype(int)
df["a"] = df["a"].astype(int)
df["seq"] = df["seq"].astype(int)
df["trial"] = df["trial"].astype(int)
df["x"] = df["x"].apply(lambda str_arr: [str(int(x + HALF_WIDTH)) for x in ast.literal_eval(str_arr)])
df["y"] = df["y"].apply(lambda str_arr: [str(int(y + HALF_HEIGHT)) for y in ast.literal_eval(str_arr)])
df["t"] = df["t"].apply(lambda str_arr: [str(int(sec * 1000)) for sec in ast.literal_eval(str_arr)])

with open(dir_root / "output.sd3", "w") as file:
    file.write("TRACE DATA\n")
    file.write(
        "App,Participant,Condition,Session,Group,TaskType,SelectionMethod,Block,Sequence,A,W,Trial,from_x,from_y,to_x,to_y,{t_x_y}\n")
    for _, row in df.iterrows():
        from_x, from_y = [round(_, 1) for _ in ast.literal_eval(row["from"])]
        to_x, to_y = [round(_, 1) for _ in ast.literal_eval(row["to"])]
        from_to = ",".join(
            [str(_) for _ in [from_x + HALF_WIDTH, from_y + HALF_HEIGHT, to_x + HALF_WIDTH, to_y + HALF_HEIGHT]])
        for d in ["t", "x", "y"]:
            file.write(
                f"FittsTask,P00,C00,S00,G00,2D,DT0,B00,{row['seq']},{row['a']},{row['w']},{row['trial']},{from_to},{d}=,{','.join(row[d])}\n")
