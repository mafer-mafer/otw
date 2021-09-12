import React from "react";
import classNames from "classnames";

const SingleAllGroup = (props) => {
  return props
    .filterRepeats()
    .sort(function (a, b) {
      if (a.name > b.name) return 1;
      if (a.name < b.name) return -1;
      return 0;
    })
    .map((group) => {
      return (
        <p className="edit-group-lists" key={group.id}>
          <span
            onClick={() => props.selectGroup(group, "all")}
            className={classNames("all-groups-hover", {
              "selected-group":
                props.selectedName === group.name &&
                props.selectedType === "all",
            })}
          >
            {group.name}
          </span>
        </p>
      );
    });
};

export default SingleAllGroup;
