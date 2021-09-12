import React from "react";
import classNames from "classnames";

const SingleFaveGroup = (props) => {
  return props.faveGroups
    .sort(function (a, b) {
      if (a.name > b.name) return 1;
      if (a.name < b.name) return -1;
      return 0;
    })
    .map((group) => {
      return (
        <p className="edit-group-lists" key={group.id}>
          <span
            onClick={() => props.selectGroup(group, "fave")}
            className={classNames("all-groups-hover", {
              "selected-group":
                props.selectedName === group.name &&
                props.selectedType === "fave",
            })}
          >
            {group.name}
          </span>
        </p>
      );
    });
};

export default SingleFaveGroup;
