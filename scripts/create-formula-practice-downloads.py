from datetime import date, datetime
from pathlib import Path
import re
from zipfile import ZIP_DEFLATED, ZipFile, ZipInfo

from openpyxl import Workbook, load_workbook
from openpyxl.formatting.rule import FormulaRule
from openpyxl.styles import Alignment, Border, Font, PatternFill, Side
from openpyxl.utils import get_column_letter

ROOT = Path(__file__).resolve().parents[1]
DOWNLOADS = ROOT / "pages-downloads"
PROMPTS = DOWNLOADS / "excel-formula-prompts"
WORKBOOK_PATH = DOWNLOADS / "dr-vicki-excel-formula-practice.xlsx"
ZIP_PATH = DOWNLOADS / "dr-vicki-excel-formula-prompt-pack.zip"

NAVY = "071A2E"
BLUE = "315F95"
CORAL = "FF6048"
LIME = "C7DD2B"
IVORY = "F8F3E8"
WHITE = "FFFFFF"
MUTED = "EDE8DE"
TEXT = "445267"
YELLOW = "FFF1A6"
GREEN = "DCEFA8"
RED = "F8C9C1"
THIN = Side(style="thin", color="D9D4CA")
MEDIUM = Side(style="medium", color=NAVY)
ARCHIVE_TIME = (2026, 9, 14, 12, 0, 0)


def normalize_archive(path):
    temporary = path.with_suffix(f"{path.suffix}.tmp")
    with ZipFile(path, "r") as source, ZipFile(temporary, "w", compression=ZIP_DEFLATED) as target:
        for name in sorted(source.namelist()):
            info = ZipInfo(name, date_time=ARCHIVE_TIME)
            info.compress_type = ZIP_DEFLATED
            info.external_attr = 0o600 << 16
            content = source.read(name)
            if name == "docProps/core.xml":
                content = re.sub(
                    rb"(<dcterms:modified[^>]*>)[^<]+",
                    rb"\g<1>2026-09-14T12:00:00Z",
                    content,
                )
            target.writestr(info, content)
    temporary.replace(path)


def title_block(ws, title, subtitle, width=6):
    ws.sheet_view.showGridLines = False
    ws.freeze_panes = "A6"
    end = get_column_letter(width)
    ws.merge_cells(f"A1:{end}1")
    ws["A1"] = title
    ws["A1"].font = Font(name="Aptos Display", size=24, bold=True, color=WHITE)
    ws["A1"].fill = PatternFill("solid", fgColor=NAVY)
    ws["A1"].alignment = Alignment(vertical="center")
    ws.row_dimensions[1].height = 38

    ws.merge_cells(f"A2:{end}2")
    ws["A2"] = subtitle
    ws["A2"].font = Font(name="Aptos", size=11, italic=True, color=TEXT)
    ws["A2"].fill = PatternFill("solid", fgColor=IVORY)
    ws["A2"].alignment = Alignment(wrap_text=True, vertical="center")
    ws.row_dimensions[2].height = 36

    ws.merge_cells(f"A3:{end}3")
    ws["A3"] = "Dr. Vicki's Tech Talk  •  Describe → Generate → Stress-test → Save"
    ws["A3"].font = Font(name="Aptos", size=10, bold=True, color=NAVY)
    ws["A3"].fill = PatternFill("solid", fgColor=LIME)
    ws["A3"].alignment = Alignment(vertical="center")
    ws.row_dimensions[3].height = 24


def table_header(ws, headers, row=5):
    for col, value in enumerate(headers, start=1):
        cell = ws.cell(row=row, column=col, value=value)
        cell.font = Font(name="Aptos", size=10, bold=True, color=WHITE)
        cell.fill = PatternFill("solid", fgColor=BLUE)
        cell.alignment = Alignment(wrap_text=True, vertical="center")
        cell.border = Border(bottom=MEDIUM)
    ws.row_dimensions[row].height = 32


def style_data(ws, start_row, end_row, columns):
    for row in range(start_row, end_row + 1):
        fill = PatternFill("solid", fgColor=WHITE if row % 2 == 0 else IVORY)
        for col in range(1, columns + 1):
            cell = ws.cell(row=row, column=col)
            cell.fill = fill
            cell.font = Font(name="Aptos", size=10, color=TEXT)
            cell.alignment = Alignment(wrap_text=True, vertical="top")
            cell.border = Border(bottom=THIN)
        ws.row_dimensions[row].height = 38


def finish_lab(ws, widths, print_area):
    for col, width in enumerate(widths, start=1):
        ws.column_dimensions[get_column_letter(col)].width = width
    ws.sheet_properties.pageSetUpPr.fitToPage = True
    ws.page_setup.fitToWidth = 1
    ws.page_setup.fitToHeight = 1
    ws.page_setup.orientation = "landscape"
    ws.page_setup.paperSize = ws.PAPERSIZE_A4
    ws.print_area = print_area
    ws.print_options.horizontalCentered = True
    ws.page_margins.left = 0.25
    ws.page_margins.right = 0.25
    ws.page_margins.top = 0.35
    ws.page_margins.bottom = 0.35
    ws.oddFooter.center.text = "Dr. Vicki's Tech Talk  •  Excel Formula Practice Lab"
    ws.oddFooter.center.size = 8
    ws.oddFooter.center.color = TEXT


def add_match_formatting(ws, match_range):
    ws.conditional_formatting.add(
        match_range,
        FormulaRule(formula=[f'{match_range.split(":")[0]}="Match"'], fill=PatternFill("solid", fgColor=GREEN)),
    )
    ws.conditional_formatting.add(
        match_range,
        FormulaRule(formula=[f'{match_range.split(":")[0]}="Check"'], fill=PatternFill("solid", fgColor=RED)),
    )


def build_start(wb):
    ws = wb.active
    ws.title = "Start Here"
    title_block(ws, "Excel Formula Practice Lab", "Three fictional mini-datasets for practicing AI-assisted formula generation without risking live business data.")
    table_header(ws, ["Lab", "Business question", "Formula skill", "Edge cases", "Your goal", "Reference tab"])
    rows = [
        ("1", "What is each product's profit margin?", "IF + arithmetic", "Zero revenue, blank cost, loss", "Write a formula that returns blank when the result should not be calculated.", "Lab 1 - Margin"),
        ("2", "Which product matches each messy SKU?", "XLOOKUP + TRIM + UPPER", "Extra spaces, lowercase, missing key", "Normalize the key before looking it up and return a useful missing-value label.", "Lab 2 - Lookup"),
        ("3", "What is each invoice's status?", "Nested IF", "Paid invoices, blank dates, overdue, due today", "Apply the business rules in the stated priority order.", "Lab 3 - Status"),
    ]
    for row_index, values in enumerate(rows, start=6):
        for col_index, value in enumerate(values, start=1):
            ws.cell(row=row_index, column=col_index, value=value)
    style_data(ws, 6, 8, 6)
    ws.merge_cells("A10:F10")
    ws["A10"] = "How to practice: describe the goal and sheet layout to your approved AI tool, ask for a formula plus assumptions, paste your formula into the yellow column, and compare the match result. Then open the answer key only after testing."
    ws["A10"].font = Font(name="Aptos", size=11, bold=True, color=NAVY)
    ws["A10"].fill = PatternFill("solid", fgColor=YELLOW)
    ws["A10"].alignment = Alignment(wrap_text=True, vertical="center")
    ws.row_dimensions[10].height = 54
    ws.merge_cells("A12:F12")
    ws["A12"] = "These datasets are fictional. Use only an AI tool approved for the data you are handling."
    ws["A12"].font = Font(name="Aptos", size=10, italic=True, color=CORAL)
    finish_lab(ws, [9, 34, 26, 30, 40, 22], "A1:F12")


def build_margin(wb):
    ws = wb.create_sheet("Lab 1 - Margin")
    title_block(ws, "Lab 1: Guard a Profit-Margin Formula", "Goal: calculate (Revenue - Cost) / Revenue. Return blank when revenue is zero or when a required input is blank.")
    table_header(ws, ["Product", "Revenue", "Cost", "Expected margin", "Your formula result", "Match?"])
    rows = [
        ("Aster", 1200, 720),
        ("Beacon", 0, 100),
        ("Cedar", 900, None),
        ("Delta", 1000, 1000),
        ("Echo", 800, 920),
    ]
    for row_index, (product, revenue, cost) in enumerate(rows, start=6):
        ws.cell(row=row_index, column=1, value=product)
        ws.cell(row=row_index, column=2, value=revenue)
        ws.cell(row=row_index, column=3, value=cost)
        ws.cell(row=row_index, column=4, value=f'=IF(OR(B{row_index}="",C{row_index}="",B{row_index}=0),"",(B{row_index}-C{row_index})/B{row_index})')
        ws.cell(row=row_index, column=5, value="")
        ws.cell(row=row_index, column=6, value=f'=IF(E{row_index}="","Try it",IF(OR(AND(D{row_index}="",E{row_index}=""),ABS(D{row_index}-E{row_index})<0.000001),"Match","Check"))')
    style_data(ws, 6, 10, 6)
    for row in range(6, 11):
        ws.cell(row=row, column=4).number_format = "0.0%;[Red]-0.0%"
        ws.cell(row=row, column=5).number_format = "0.0%;[Red]-0.0%"
        ws.cell(row=row, column=5).fill = PatternFill("solid", fgColor=YELLOW)
    add_match_formatting(ws, "F6:F10")
    ws.merge_cells("A12:F12")
    ws["A12"] = 'Reference formula for E6: =IF(OR(B6="",C6="",B6=0),"",(B6-C6)/B6)  •  Fill down after testing the first row.'
    ws["A12"].font = Font(name="Aptos", size=10, bold=True, color=NAVY)
    ws["A12"].fill = PatternFill("solid", fgColor=GREEN)
    ws["A12"].alignment = Alignment(wrap_text=True)
    finish_lab(ws, [18, 16, 16, 20, 22, 14], "A1:F12")


def build_lookup(wb):
    ws = wb.create_sheet("Lab 2 - Lookup")
    title_block(ws, "Lab 2: Normalize a Lookup Key", "Goal: trim spaces, ignore capitalization, return the matching product, and show “Not found” for an unknown SKU.", width=9)
    table_header(ws, ["Raw SKU", "Expected product", "Your formula result", "Match?"], row=5)
    rows = [
        (" ab-101 ", "Widget"),
        ("CD-205", "Cable"),
        ("ef-310", "Adapter"),
        ("XX-999", "Not found"),
        ("AB-101", "Widget"),
    ]
    for row_index, (sku, expected) in enumerate(rows, start=6):
        ws.cell(row=row_index, column=1, value=sku)
        ws.cell(row=row_index, column=2, value=expected)
        ws.cell(row=row_index, column=3, value="")
        ws.cell(row=row_index, column=4, value=f'=IF(C{row_index}="","Try it",IF(B{row_index}=C{row_index},"Match","Check"))')
    style_data(ws, 6, 10, 4)
    for row in range(6, 11):
        ws.cell(row=row, column=3).fill = PatternFill("solid", fgColor=YELLOW)
    add_match_formatting(ws, "D6:D10")

    ws["F5"] = "Lookup SKU"
    ws["G5"] = "Product"
    for cell in (ws["F5"], ws["G5"]):
        cell.font = Font(name="Aptos", size=10, bold=True, color=WHITE)
        cell.fill = PatternFill("solid", fgColor=BLUE)
    lookup = [("AB-101", "Widget"), ("CD-205", "Cable"), ("EF-310", "Adapter")]
    for row_index, values in enumerate(lookup, start=6):
        ws.cell(row=row_index, column=6, value=values[0])
        ws.cell(row=row_index, column=7, value=values[1])
    style_data(ws, 6, 8, 7)
    for row in range(6, 11):
        ws.cell(row=row, column=3).fill = PatternFill("solid", fgColor=YELLOW)
    ws.merge_cells("A12:I12")
    ws["A12"] = 'Reference formula for C6: =IFERROR(XLOOKUP(UPPER(TRIM(A6)),$F$6:$F$8,$G$6:$G$8),"Not found")  •  Fill down after testing the first row.'
    ws["A12"].font = Font(name="Aptos", size=10, bold=True, color=NAVY)
    ws["A12"].fill = PatternFill("solid", fgColor=GREEN)
    ws["A12"].alignment = Alignment(wrap_text=True)
    finish_lab(ws, [18, 22, 22, 14, 4, 18, 20, 4, 4], "A1:I12")


def build_status(wb):
    ws = wb.create_sheet("Lab 3 - Status")
    title_block(ws, "Lab 3: Apply Invoice-Status Rules", "Goal: Paid wins first; blank due dates need attention; otherwise classify overdue, due today, or open.", width=8)
    ws["G4"] = "Evaluation date"
    ws["H4"] = date(2026, 9, 13)
    ws["H4"].number_format = "mmm d, yyyy"
    ws["G4"].font = Font(name="Aptos", size=10, bold=True, color=NAVY)
    ws["H4"].font = Font(name="Aptos", size=10, bold=True, color=CORAL)
    table_header(ws, ["Invoice", "Due date", "Paid?", "Expected status", "Your formula result", "Match?"])
    rows = [
        ("INV-1001", date(2026, 9, 5), "Yes", "Paid"),
        ("INV-1002", date(2026, 9, 10), "No", "Overdue"),
        ("INV-1003", date(2026, 9, 20), "No", "Open"),
        ("INV-1004", None, "No", "Needs due date"),
        ("INV-1005", date(2026, 9, 13), "No", "Due today"),
    ]
    for row_index, values in enumerate(rows, start=6):
        for col_index, value in enumerate(values, start=1):
            ws.cell(row=row_index, column=col_index, value=value)
        ws.cell(row=row_index, column=5, value="")
        ws.cell(row=row_index, column=6, value=f'=IF(E{row_index}="","Try it",IF(D{row_index}=E{row_index},"Match","Check"))')
    style_data(ws, 6, 10, 6)
    for row in range(6, 11):
        ws.cell(row=row, column=2).number_format = "mmm d, yyyy"
        ws.cell(row=row, column=5).fill = PatternFill("solid", fgColor=YELLOW)
    add_match_formatting(ws, "F6:F10")
    ws.merge_cells("A12:H12")
    ws["A12"] = 'Reference formula for E6: =IF(C6="Yes","Paid",IF(B6="","Needs due date",IF(B6<$H$2,"Overdue",IF(B6=$H$2,"Due today","Open"))))  •  Fill down.'
    ws["A12"].font = Font(name="Aptos", size=10, bold=True, color=NAVY)
    ws["A12"].fill = PatternFill("solid", fgColor=GREEN)
    ws["A12"].alignment = Alignment(wrap_text=True)
    finish_lab(ws, [18, 18, 12, 22, 22, 14, 20, 18], "A1:H12")


def build_answer_key(wb):
    ws = wb.create_sheet("Answer Key")
    title_block(ws, "Answer Key & Assumptions", "Read the explanation after you have written and tested your own formula.")
    table_header(ws, ["Lab", "Reference formula", "Business rule", "Important assumption", "Edge case", "Why this version"])
    rows = [
        ("Margin", 'Formula: =IF(OR(B6="",C6="",B6=0),"",(B6-C6)/B6)', "Margin is profit divided by revenue.", "Revenue and cost are numeric when present.", "Zero revenue or a blank input returns blank.", "Avoids #DIV/0! and does not silently treat a missing cost as zero."),
        ("Lookup", 'Formula: =IFERROR(XLOOKUP(UPPER(TRIM(A6)),$F$6:$F$8,$G$6:$G$8),"Not found")', "Match a cleaned SKU to the inventory table.", "Internal spaces and punctuation are meaningful.", "Unknown keys return a visible label.", "TRIM and UPPER handle common formatting drift before XLOOKUP runs."),
        ("Status", 'Formula: =IF(C6="Yes","Paid",IF(B6="","Needs due date",IF(B6<$H$2,"Overdue",IF(B6=$H$2,"Due today","Open"))))', "Apply status rules in priority order.", "Paid? is consistently Yes or No.", "A blank date is not classified as overdue.", "The order prevents a paid but old invoice from being labeled overdue."),
    ]
    for row_index, values in enumerate(rows, start=6):
        for col_index, value in enumerate(values, start=1):
            ws.cell(row=row_index, column=col_index, value=value)
    style_data(ws, 6, 8, 6)
    for row in range(6, 9):
        ws.row_dimensions[row].height = 84
    finish_lab(ws, [14, 58, 30, 32, 32, 38], "A1:F8")


def build_workbook():
    wb = Workbook()
    wb.properties.creator = "Dr. Vicki's Tech Talk"
    wb.properties.lastModifiedBy = "Dr. Vicki's Tech Talk"
    wb.properties.created = datetime(2026, 9, 14, 12, 0, 0)
    wb.properties.modified = datetime(2026, 9, 14, 12, 0, 0)
    build_start(wb)
    build_margin(wb)
    build_lookup(wb)
    build_status(wb)
    build_answer_key(wb)
    wb.calculation.fullCalcOnLoad = True
    wb.calculation.forceFullCalc = True
    DOWNLOADS.mkdir(parents=True, exist_ok=True)
    wb.save(WORKBOOK_PATH)
    normalize_archive(WORKBOOK_PATH)

    verified = load_workbook(WORKBOOK_PATH, data_only=False)
    expected = ["Start Here", "Lab 1 - Margin", "Lab 2 - Lookup", "Lab 3 - Status", "Answer Key"]
    if verified.sheetnames != expected:
        raise RuntimeError(f"Unexpected workbook sheets: {verified.sheetnames}")
    if verified["Lab 1 - Margin"]["D6"].value != '=IF(OR(B6="",C6="",B6=0),"",(B6-C6)/B6)':
        raise RuntimeError("Margin reference formula is missing")
    if verified["Lab 2 - Lookup"]["B9"].value != "Not found":
        raise RuntimeError("Lookup test case is missing")
    if verified["Lab 3 - Status"]["D10"].value != "Due today":
        raise RuntimeError("Status test case is missing")
    verified.close()


def build_zip():
    files = [
        PROMPTS / "README.md",
        PROMPTS / "01-translate-goal-to-formula.txt",
        PROMPTS / "02-stress-test-edge-cases.txt",
        PROMPTS / "03-build-reusable-formula-library.txt",
    ]
    with ZipFile(ZIP_PATH, "w", compression=ZIP_DEFLATED) as archive:
        for file in files:
            info = ZipInfo(file.name, date_time=ARCHIVE_TIME)
            info.compress_type = ZIP_DEFLATED
            info.external_attr = 0o600 << 16
            archive.writestr(info, file.read_bytes())


if __name__ == "__main__":
    build_workbook()
    build_zip()
    print(f"Created {WORKBOOK_PATH} ({WORKBOOK_PATH.stat().st_size} bytes)")
    print(f"Created {ZIP_PATH} ({ZIP_PATH.stat().st_size} bytes)")
