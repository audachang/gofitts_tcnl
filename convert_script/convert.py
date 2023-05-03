import pandas as pd
import argparse
import ast
import os

from pathlib import Path

HALF_WIDTH = 960
HALF_HEIGHT = 540


def convert_file(path: Path, do_csv: bool = False):
    df = pd.read_csv(path)
    if "身分證字號" not in df.columns:
        raise ValueError("身分證字號 not found in csv!")
    participant = df["身分證字號"].iloc[0]
    df = df[["sequence_loop.thisN", "trial_loop.thisN", "from", "to", "mouse.x", "mouse.y", "mouse.time", "w", "a"]]

    df.rename(columns={
        "sequence_loop.thisN": "seq",
        "trial_loop.thisN": "trial",
        "mouse.x": "x",
        "mouse.y": "y",
        "mouse.time": "t"
    }, inplace=True)

    # drop nans in df
    df = df.dropna()
    df["w"] = df["w"].astype(int)
    df["a"] = df["a"].astype(int)

    df["seq"] = df["seq"].astype(int)
    df["trial"] = df["trial"].astype(int)
    df["x"] = df["x"].apply(lambda str_arr: [str(int(x + HALF_WIDTH)) for x in ast.literal_eval(str_arr)])
    df["y"] = df["y"].apply(lambda str_arr: [str(int(y + HALF_HEIGHT)) for y in ast.literal_eval(str_arr)])
    df["t"] = df["t"].apply(lambda str_arr: [str(int(sec * 1000)) for sec in ast.literal_eval(str_arr)])

    output_csv_path = Path(path.parent / f"FittsTask-{participant}.sd3")

    with open(output_csv_path, "w") as file:
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
                    f"FittsTask,{participant},C00,S00,G00,2D,DT0,B00,{row['seq']},{row['a']},{row['w']},{row['trial']},{from_to},{d}=,{','.join(row[d])}\n")

    if do_csv:
        os.system(F"java -jar GoFitts_modified.jar -p {output_csv_path}")
        print("Converted to csv!")


def main():
    parser = argparse.ArgumentParser()
    parser.add_argument("-f", "--file", type=str, help='File to convert')
    parser.add_argument("-d", "--dir", type=str, help="Convert directory")

    has_jar = os.path.isfile("GoFitts_modified.jar")
    if not has_jar:
        print("GoFitts_modified.jar not found! You will not be able to convert to csv.")

    args = parser.parse_args()
    if args.dir:
        directory = Path(args.dir)
        if not directory.exists():
            raise FileNotFoundError(f"Directory {args.dir} does not exist!")
        else:
            for path in directory.glob("*.csv"):
                print("Converting:", path.name)
                try:
                    convert_file(path, has_jar)
                except ValueError as e:
                    print(e)
                    print("Skipping:", path.name)
    elif args.file:
        file = Path(args.file)
        if not file.exists():
            raise FileNotFoundError(f"File {args.file} does not exist!")
        else:
            print("Converting:", file.name)
            convert_file(file, has_jar)


if __name__ == "__main__":
    main()
